import { serve } from "https://deno.land/std@0.220.1/http/server.ts";
import { router } from "./router.ts";

const PORT = 8098;

console.log(`リダイレクターサーバーを起動中... http://localhost:${PORT}/`);

await serve(router, { port: PORT });
