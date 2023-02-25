<div align="center">
<img src="https://user-images.githubusercontent.com/44495184/221377941-7c48e06f-4ede-4608-a64b-77fa3146d019.png" />
</div>


<div align="center">
  <h1>Poltergeist</h1>
</div>

Poltergeist is [Astro](https://astro.build/) + [Notion](https://notion.so) based content platform.

The 🐒 idea is: you write your posts in Notion, Astro statically generates them.

The 🦍 idea is: you choose where you manage your content (Notion/Obsidian/VSCode/whatever), Poltergeist provides the infrastructure and integrations, and Astro statically generates them.

See [todo](todo.md) for the current status.

## Database

Poltergeist uses [Notion](https://notion.so) as a blog post database. You have to point to a database in your Notion workspace through an env var `NOTION_DATABASE_ID`.

You have to provide names of some key properties in your database through env vars:

- `PUBLISHED_ATTRIBUTE`: checkbox. Indicates whether the post is published or not.

Blog posts with `PUBLISHED_ATTRIBUTE` set to `false` will only be rendered in development.
