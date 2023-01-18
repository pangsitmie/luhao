/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const crypto = require('crypto');
const path = require(`path`);
// const createPaginatedPages = require("gatsby-paginate");  // 動態製作選單ui

exports.sourceNodes = async ({
  actions
}) => {
  /* 模擬資料生成 */
  const {
    createNode
  } = actions;
  const products = []
  for (var i = 0; i < 50; i++) {
    /* 產生資料 */
    products.push({
      id: `${i+1}`,
      name: `Product ${i+1}`,
      stock: Math.floor((Math.random() * 100) + 1),
      price: `${Math.floor((Math.random() * 1000) + 1)} INR`,
    })
  }
  products.forEach(content => {
    const productNode = {
      id: content.id,
      parent: null,
      children: [],
      internal: {
        type: `Product`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(content))
          .digest(`hex`),
      },
      name: content.name,
      stock: content.stock,
      price: content.price,
    }
    createNode(productNode);
  });
};
const lang = [{
    id: 1,
    lang: ''
  },
  {
    id: 2,
    lang: 'en-us'
  },
  {
    id: 3,
    lang: 'es'
  },
]
exports.createPages = ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allProduct {
          edges {
            node {
              id
              name
              stock
              price
            }
          }
        }
      }
    `).then(result => {
      // createPaginatedPages({ /* 選單頁面生成 可動態生成 machine.jsx */
      //   edges: result.data.allProduct.edges,
      //   createPage: createPage,
      //   pageTemplate: "src/productModuble/product.jsx",
      //   pageLength: 10, // This is optional and defaults to 10 if not used
      //   pathPrefix: "productList", // This is optional and defaults to an empty string if not used
      // });
      result.data.allProduct.edges.forEach(({
        node
      }) => {
        lang.map((data) => (
          createPage({
            path: data.lang + `/machine/product-${node.id}/`,
            /* 拜訪路徑 */
            component: path.resolve(`./src/productModuble/productDetail.jsx`),
            /* 模型 */
            context: {
              productId: node.id
            },
          })
        ))
      })
      resolve()
    })
  }).catch(error => {
    console.log(error)
    reject()
  })
};