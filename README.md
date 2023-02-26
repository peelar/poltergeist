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

## Setup

Poltergeist uses [Notion](https://notion.so) as a blog post database. That means you need to:

<details>

<summary>1. Generate a Notion API key</summary>

1. Go to [Notion API](https://www.notion.so/my-integrations).
2. Create a new integration. Copy the _Internal Integration Token_.
3. Store the token in your `.env` file as `NOTION_API_KEY`.

</details>

<details>

<summary>2. Set up a Notion database</summary>

1. Go to [Notion](https://notion.so).
2. Create a new database.
3. Add the following properties:
   - `Post` (title) - the title of the post. Should point to the post's page.
   - `Published` (checkbox) - indicates whether the post is published or not.
   - `Slug` (text) - the slug of the post.

If you want to use different names for these properties, you can set them in your `.env` file. See `.env.example`.
4. Click _Share_, and copy the database id. It's the part of the URL after `notion.so/` and before the first `?`.
5. Store the database id in your `.env` file as `NOTION_DATABASE_ID`.

</details>
  