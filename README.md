# Poltergeist
![Frame 1](https://user-images.githubusercontent.com/44495184/221351962-5749dfd3-8f38-4a86-8d3f-e00e4d6f4701.png)

Poltergeist is [Astro](https://astro.build/) + [Notion](https://notion.so) based content platform.

The 🐒 idea is: you write your posts in Notion, Astro consumes and renders them as pages.

The 🦍 idea is: you choose where you manage your content (Notion/Obsidian/VSCode/whatever), Poltergeist provides the infrastructure and integrations, and Astro renders your content.

## Todo

- [x] - manage Notion instance by env
- [x] - add Notion Client
- [x] - add notion renderer
- [x] - add basic Astro blog post renderer
- [ ] - investigate generating markdown on demand (e.g. from CI/CD)
- [ ] - add draft support
- [ ] - add metadata management from Notion
- map Notion blocks to components
  - [x] - text
  - [x] - headings
  - [ ] - bulleted list
  - [ ] - code
  - [ ] - todolist
  - [ ] - numbered list
  - [ ] - toggle list
  - [ ] - quote
