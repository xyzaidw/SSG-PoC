require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const Home = require("./src/components/Home").default;
const About = require("./src/components/About").default;
const Contact = require("./src/components/Contact").default;
const NotFound = require("./src/components/NotFound").default;
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");

// require("ignore-styles").default([".css", ".scss"]);
// const { default: App } = require("./src/App");
// const { JSDOM } = require("jsdom");

const routes = [
  { path: "/home", component: Home },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  {
    path: "/not-found",
    component: NotFound,
  },
];

const initRoutes = async () => {
  const apiData = await fetch(
    "https://api2.dev.cubotoo.ch/public/categories?type=tree"
  );
  const data = await apiData.json();

  await data.forEach((item) => {
    routes.push({ path: item.category_number, component: NotFound });
  });

  // console.log(routes);
};

// Function to generate static HTML for a route

async function renderHTML(route) {
  const apiData = await fetch(
    "https://api2.dev.cubotoo.ch/public/categories?type=tree"
  );
  const data = await apiData.json();

  const markup = ReactDOMServer.renderToString(
    React.createElement(
      StaticRouter,
      { location: route.path },
      React.createElement(route.component, { data }) // TODO: Pass data as a prop - status: done.
    )
  );

  // reading the original index.html file
  const originalHtml = fs.readFileSync(
    path.resolve(__dirname, "build", "index.html"),
    "utf8"
  );

  const finalHtml = originalHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${markup}</div>`
  );

  // Define the output path for the HTML file
  const filePath = path.join(
    __dirname,
    "build",
    route.path === "/" ? "index.html" : `${route.path}/index.html`
  );

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFileSync(filePath, finalHtml);
  console.log(`Generated static HTML for ${route.path} ✅`);
}

// case: update reactSnap config
async function updateReactSnapConfig() {
  const packageJson = require("./package.json");
  packageJson.reactSnap.include = routes.map((route) => route.path);

  fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

  console.log("Updated reactSnap config ✅");
}

// Generating HTML files for all routes
initRoutes()
  .then(() => {
    routes.forEach(renderHTML);
  })
  .then(() => {
    updateReactSnapConfig();
  });
