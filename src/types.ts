import type { GetStaticPathsResult } from "astro";

export type InferGetStaticPathsResult<
  TGetStaticPaths extends () => Promise<GetStaticPathsResult>
> = Awaited<ReturnType<TGetStaticPaths>>[number];
