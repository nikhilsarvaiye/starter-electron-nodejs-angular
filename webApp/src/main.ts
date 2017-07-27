// Instantiate server app
import 'ts-helpers';

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { bootloader } from '@angularclass/bootloader';

// root component
import { AppModule } from "./app/app.module";

// Declare process variable (so that type checker doesn't nag about it)
declare var process;

if (process.env.NODE_ENV === "production") {
  enableProdMode();
}

export function main(): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
}

// support async tag or hmr
bootloader(main);
