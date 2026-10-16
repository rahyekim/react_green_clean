import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // 1. any 타입 쓸 때 뜨는 빨간줄 끄기
      "@typescript-eslint/no-explicit-any": "off",
      
      // 2. useEffect 안에서 상태 바꿀 때 뜨는 경고/빨간줄 끄기
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
