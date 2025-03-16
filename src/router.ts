import { STATUS_CODE } from "https://deno.land/std@0.220.1/http/status.ts";

type Route = {
  pattern: URLPattern;
  handler: (req: Request, match: URLPatternResult) => Promise<Response>;
};

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: handleHome,
  },
  {
    pattern: new URLPattern({ pathname: "/redirect" }),
    handler: handleRedirect,
  },
  {
    pattern: new URLPattern({ pathname: "/static/:file" }),
    handler: handleStatic,
  },
];

/**
 * リクエストのルーティングを処理する
 */
export function router(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // ルートマッチング
  for (const route of routes) {
    const match = route.pattern.exec(url);
    if (match) {
      return route.handler(req, match);
    }
  }

  // 404処理
  return Promise.resolve(new Response("ページが見つかりません", { status: STATUS_CODE.NotFound }));
}

/**
 * ホームページを表示する
 */
async function handleHome(_req: Request): Promise<Response> {
  const html = await Deno.readTextFile("./static/index.html");
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/**
 * リダイレクト処理を行う
 */
function handleRedirect(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const redirectURL = url.searchParams.get("to");
  
  if (!redirectURL) {
    return Promise.resolve(new Response("リダイレクト先のURLが指定されていません", { status: STATUS_CODE.BadRequest }));
  }

  // リダイレクト先のURLをデコード
  const decodedURL = decodeURIComponent(redirectURL);
  
  // obsidianスキームへのリダイレクト
  return Promise.resolve(Response.redirect(decodedURL, STATUS_CODE.Found));
}

/**
 * 静的ファイルを提供する
 */
async function handleStatic(_req: Request, match: URLPatternResult): Promise<Response> {
  try {
    const fileName = match.pathname.groups.file;
    const fileContent = await Deno.readFile(`./static/${fileName}`);
    
    const contentType = getContentType(fileName);
    
    return new Response(fileContent, {
      headers: { "content-type": contentType },
    });
  } catch (error) {
    console.error("静的ファイル取得エラー:", error);
    return new Response("ファイルが見つかりません", { status: STATUS_CODE.NotFound });
  }
}

/**
 * ファイル拡張子に基づいてContent-Typeを取得する
 */
function getContentType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  const contentTypes: Record<string, string> = {
    "html": "text/html; charset=utf-8",
    "css": "text/css; charset=utf-8",
    "js": "text/javascript; charset=utf-8",
    "json": "application/json; charset=utf-8",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",
  };

  return contentTypes[extension] || "application/octet-stream";
}