// -------------------------------------------------------------------------------------

// const fs = require("fs");
// const path = require("path");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const { JSDOM } = require("jsdom");

// const App = require("./src/App").default;
// const About = require("./src/components/About").default;
// const Home = require("./src/components/Home").default;
// const Contact = require("./src/components/Contact").default;

// // Mock the browser env
// const { window } = new JSDOM("<!doctype html><html><body></body></html>");
// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: "node.js",
// };

// // TODO: create these after calling categories api.
// const components = [
//   { component: App, fileName: "index.html" },
//   { component: About, fileName: "about.html" },
//   { component: Home, fileName: "home.html" },
//   { component: Contact, fileName: "contact.html" },
// ];

// // Function to render a component to static HTML
// function renderComponent(component, fileName) {
//   const componentHTML = ReactDOMServer.renderToString(
//     React.createElement(component) // passing props.
//   );
//   const html = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>${fileName}</title>
//     </head>
//     <body>
//       <div id="root">${componentHTML}</div>
//     </body>
//     </html>
//   `;

//   fs.writeFileSync(path.join(__dirname, "build", fileName), html, "utf8");
//   console.log(`Generated ${fileName}`);
// }

// // build directory exists
// if (!fs.existsSync(path.join(__dirname, "build"))) {
//   fs.mkdirSync(path.join(__dirname, "build"));
// }

// // Render each component to static HTML
// components.forEach(({ component, fileName }) => {
//   renderComponent(component, fileName);
// });

// console.log("Static HTML generation complete!");

// // "reactSnap": {
// //   "include": [
// //     "/",
// //     "/about",
// //     "/contact",
// //     "/other-route"
// //   ]
// // }
