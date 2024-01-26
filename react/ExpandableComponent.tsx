import React, { useState, useRef, useLayoutEffect } from 'react'
import { useResponsiveValues } from 'vtex.responsive-values'
import { useCssHandles } from 'vtex.css-handles'
import './styles.css'

interface ExpandableComponentProps {
  children: React.ReactNode
  maxHeight:
    | string
    | {
        desktop: string
        mobile: string
      }
  seeMoreText?: string
  seeLessText?: string
}

export const CSS_HANDLES = [
  'buttonContainer',
  'mainContainer',
  'seeMoreButton',
  'seeLessButton',
  'expanded',
] as const

function ExpandableComponent({
  seeLessText = 'Ver menos', // valor padrão caso esteja vazio
  seeMoreText = 'Ver mais', // valor padrão caso esteja vazio
  maxHeight = '100px', // valor padrão caso esteja vazio
  children,
}: ExpandableComponentProps) {
  const responsiveMaxHeight =
    typeof maxHeight === 'string' ? maxHeight : useResponsiveValues(maxHeight)
  const [shouldShowButton, setShouldShowButton] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)
  const divRef = useRef<HTMLDivElement>(null)

  const getMaxHeight = () => {
    if (typeof responsiveMaxHeight === 'string') {
      return responsiveMaxHeight
    } else {
      const { desktop, mobile } = responsiveMaxHeight
      const keys = Object.keys(responsiveMaxHeight)
      if (!keys.every((key) => key === 'desktop' || key === 'mobile')) {
        console.error(
          'Chave inválida em maxHeight. Somente "desktop" e/ou "mobile" são permitidos.'
        )
        return '100px' // valor padrão caso esteja vazio
      }
      const isMobile = window.innerWidth <= 1024
      return isMobile ? mobile || desktop : desktop || mobile
    }
  }

  useLayoutEffect(() => {
    if (divRef.current) {
      const divHeight = divRef.current.scrollHeight
      const maxHeightNumber = Number(getMaxHeight().replace('px', ''))
      setShouldShowButton(divHeight > maxHeightNumber)
    }
  }, [maxHeight, children])

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div
        ref={divRef}
        className={`${handles.mainContainer} ${
          isExpanded ? handles.expanded : ''
        }`}
        style={{ maxHeight: isExpanded ? 'none' : getMaxHeight() }}
      >
        {children}
      </div>
      {shouldShowButton && (
        <div
          className={`${handles.buttonContainer} ${
            isExpanded ? handles.expanded : ''
          }`}
        >
          <button
            onClick={toggleExpansion}
            className={`${
              isExpanded ? handles.seeLessButton : handles.seeMoreButton
            }`}
          >
            {isExpanded ? seeLessText : seeMoreText}
          </button>
        </div>
      )}
    </>
  )
}

ExpandableComponent.schema = {
  title: 'Expandable Component',
  description: 'App limitador de altura de conteúdo com botão para exibir mais/menos',
  type: 'object',
  properties: {
    maxHeight: {
      title: 'Altura máxima',
      description:
        'Pode ser uma string (ex: "100px") ou um objeto com propriedades "desktop" e "mobile" (ex: { desktop: "100px", mobile: "80px" })',
      type: 'string | object',
      properties: {
        desktop: {
          type: 'string',
        },
        mobile: {
          type: 'string',
        },
      },
    },
    seeMoreText: {
      title: 'Texto para expandir',
      description: 'Texto exibido no botão de ver expansão',
      type: 'string',
    },
    seeLessText: {
      title: 'Texto para recolher',
      description: 'Texto exibido no botão de ver recolher',
      type: 'string',
    },
  },
}

export default ExpandableComponent
