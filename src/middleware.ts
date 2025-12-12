import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === "/") {
    const acceptLanguage = context.request.headers.get("accept-language");
    let lang = "en";

    if (acceptLanguage) {
      // Simple detection logic
      if (acceptLanguage.toLowerCase().includes("fr")) {
        lang = "fr";
      }
      // Default to EN for others
    }

    return context.redirect(`/${lang}/`);
  }
  return next();
});
