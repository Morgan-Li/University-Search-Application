import "./uniList.css";
import { Link } from "react-router-dom";

export default function uniList({data}) {
    const columns = data[0] && Object.keys(data[0]);

    return (
    <div className= "uniTable"> 
        <table cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            {data[0] && columns.slice(1).map((heading) => <th>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.slice(1).map((column) => (
                    <td><Link to={`/uniPage/${row._id}`} className="link">{row[column]}</Link></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        /*<div> 
            <div className= "uniTable"> 
                <table>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Massachusetts Institute of Technology (MIT)</td>
                        <td>United States</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>University of Oxford</td>
                        <td>United Kingdom</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Stanford University</td>
                        <td>United States</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>University of Cambridge</td>
                        <td>United Kingdom</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>California Institute of Technology</td>
                        <td>United States</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Imperial College London</td>
                        <td>United Kingdom</td>
                    </tr>
                </table>
            </div>
        </div>*/
    );
  }