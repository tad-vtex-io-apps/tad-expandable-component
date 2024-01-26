# ExpandableComponent

---

O ExpandableComponent é um componente React que limita a altura do conteúdo e fornece um botão para expandir ou recolher o conteúdo.

## Uso

---

1. Crie uma nova branch e altere o vendor

```json
{
  "vendor": "{vendor}",
  "name": "fac-expandable-component",
  "version": "0.0.1",
  "title": "Expandable Component",
  "description": "App limitador de altura de conteúdo com botão para exibir mais/menos",
  ...
}
```

2. Caso não precise de alterações, libere a nova versão para o vendor, publique e faça o deploy do app. Caso precise de alterações, execute os passos após a realização das mesmas.

3. Importe o app nas dependências do seu app no `manifest.json`, assim como o seguinte exemplo:

```json
  "dependencies": {
    "{vendor}.fac-expandable-component": "0.x"
  }
```

4. Declare o bloco "expandable-component" na estrutura desejada, assim como o seguinte exemplo:

```json
  "expandable-component": {
    "children": [{"children"}],
    "props": {
      "maxHeight": {
        "desktop": "100px",
        "mobile": "50px"
      },
      "seeMoreText": "Ver Mais",
      "seeLessText": "Ver Menos"
    }
  },
```

## Props

---

- `maxHeight`: (string | object) - A altura máxima do conteúdo. Pode ser uma string (ex: "100px") ou um objeto com propriedades "desktop" e "mobile" (ex: { desktop: "100px", mobile: "80px" }).
- `seeMoreText`: (string) - O texto exibido no botão para expandir o conteúdo.
- `seeLessText`: (string) - O texto exibido no botão para recolher o conteúdo.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
