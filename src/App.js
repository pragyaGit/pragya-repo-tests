import React, { Component } from "react";
// import axios from 'axios';
import "./App.css";

const formatNumber = number =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
const urls = ["api/branch1.json", "api/branch2.json", "api/branch3.json"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sum: [],
      search: ""
    };
  }

  searchSpace = event => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
    this.componentDidMount();
  };

  componentDidMount = () => {
    Promise.all(urls.map(url => fetch(url)))
      .then(function(responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function(response) {
            return response.json();
          })
        );
      })
      .then(data => {
        // Log the data to the console
        // You would do something with both sets of data here
        this.setState({ products: data });
        console.log("products", this.state.products);
        console.log("data", data);
      })
      .catch(function(error) {
        // if there's an error, log it
        console.log(error);
      });
  };

  render() {
    const products = this.state;
    const ProductTotal = products.products
      .filter(data => {
        if (this.state.search === null || this.state.search === "") {
          return data.products;
        } else {
          data.products = data.products.filter(product =>
            product.name.toLowerCase().includes(this.state.search.toLowerCase())
          );
          return data.products;
        }
      })
      .reduce((totalProducts, product) => {
        return (
          totalProducts +
          product.products.reduce((total, product) => {
            return total + product.unitPrice;
          }, 0)
        );
      }, 0);
    // console.log("ProductTotal - ", ProductTotal);

    // const ttt = ProductTotal.products.reduce((a, product) => {
    //   console.log("price - ", product.unitPrice);
    //   return a + product.unitPrice;
    // }, 0);
    // console.log("ttttt- ", ttt);
    // const ProductTotal1 = products.products.map(({ products }) => {
    //   return products.reduce((prev, { unitPrice }) => {
    //     return +prev['unitPrice'].replace(/,/g, '') +  +unitPrice.replace(/,/g, '');
    //   });
    // });

    // const total = ProductTotal1.reduce((prev, next) => prev + next);

    // console.log(total);

    // const sum = products.products.reduce((acc, course) => {
    //   acc[course.branchId] = course.products.reduce(
    //     (acc, el) => acc + el.unitPrice,
    //     0
    //   );
    //   return acc;
    // }, {});

    // this.setState({ sum: sum});
    // console.log("sum - ", sum);
    // const exercises_courses = products.products.map(item => {
    //   item.products.reduce((sum, part) => sum + part.unitPrice, 0);
    //   return sum;
    // });
    // const sum_all = exercises_courses.reduce(
    //   (sum, sum_one) => sum + sum_one,
    //   0
    // );

    // console.log("exercises_courses - ", exercises_courses);
    // console.log("sum all", sum_all);
    ///////search/////////////////

    return (
      <div className="product-list">
        <label>Search Products</label>
        <input
          type="text"
          value={this.state.search}
          onChange={e => this.searchSpace(e)}
        />
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((item, index) => (
              <div key={index}>
                {item.products.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.unitPrice}</td>
                    <hr />
                  </tr>
                ))}
              </div>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{formatNumber(ProductTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;

// {
//   this.state.todos &&
//   Object.keys(icon).map(function (element) {
//      return <tr>
//        <td>{element}</td>
//        <td>{icon[element]}</td>
//      </tr>;
//     })
// }
/////////////
// {products.products.map(image => <div>{image.name}</div>)}

//    {
//     products.products.filter((data)=>{
//       if(this.state.search == null)
//         return data
//       else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
//         return data
// }
// }).map(function (element) {
//        return <tr>
//          <td>{element.name}</td>
//          <td>{element.unitPrice}</td>
//        </tr>;
//       })
//   }
