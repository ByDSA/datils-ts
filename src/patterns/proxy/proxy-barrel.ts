type Module = Record<string, unknown>;
const moduleCache: Record<string, Module> = {}; // Cache de módulos cargados

type ModuleObj = {
  path: string;
  omit?: string[];
  hooks?: {
    onLoadModule?: (module: any)=> void;
  };
};

// Función para cargar un módulo si no está en cache
function loadModule(moduleObj: ModuleObj) {
  if (!moduleCache[moduleObj.path]) {
    const module = require(moduleObj.path);

    moduleCache[moduleObj.path] = module;

    moduleObj.hooks?.onLoadModule?.(module);
  }

  return moduleCache[moduleObj.path];
}
type Props = {
  paths: (ModuleObj | string)[];
  dirname?: string;
  staticModule?: object;
};

export function createProxyBarrel<T>(
  { paths: modulePaths, staticModule, dirname }: Props,
): T {
// Cache de propiedad -> módulo que la contiene
  const propertyCache: Record<string, string> = {};

  return new Proxy( {
    ...staticModule,
  }, {
    get(target: any, prop: string) {
      if (!(prop in target)) {
      // Si la propiedad no se ha cacheado, buscamos en los módulos disponibles
        if (!propertyCache[prop]) {
          for (const modulePath of modulePaths) {
            let loadModuleObj: ModuleObj;

            if (typeof modulePath === "string") {
              loadModuleObj = {
                path: modulePath,
              };
            } else {
              loadModuleObj = modulePath;

              if (modulePath.omit?.includes(prop)) {
                target[prop] = undefined;
                break;
              }
            }

            let loadModuleFullPath = loadModuleObj.path;

            if (dirname)
              loadModuleFullPath = dirname + "/" + loadModuleFullPath;

            const module = loadModule( {
              ...loadModuleObj,
              path: loadModuleFullPath,
            } );

            if (prop in module) {
            // Si encontramos la propiedad, la cacheamos junto con el módulo correspondiente
              propertyCache[prop] = loadModuleFullPath;
              const value = module[prop];

              if (value === undefined)
                throw new Error(`prop=${prop} for module=${loadModuleFullPath} is undefined`);

              target[prop] = value;
              break; // Salimos cuando encontramos la propiedad
            }
          }
        } else {
        // Si ya está cacheada, simplemente la obtenemos del módulo correspondiente
          const cachedModulePath = propertyCache[prop];
          const module = moduleCache[cachedModulePath];

          target[prop] = module[prop];
        }
      }

      return target[prop]; // Devuelve la propiedad encontrada
    },
  } );
}
