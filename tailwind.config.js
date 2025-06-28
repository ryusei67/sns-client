/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // 対象ファイルを指定
    "./pages/**/*.{html,js,jsx,ts,tsx}", // 対象ファイルを指定
    "./components/**/*.{html,js,jsx,ts,tsx}", // 対象ファイルを指定
  ],
  theme: {
    extend: {}, // カスタムテーマをここに書く
  },
  plugins: [], // プラグインを使う場合に記述
}

