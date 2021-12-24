import "./uniList.css";
import { Link } from "react-router-dom";

export default function uniList({data}) {
    const columns = data[0] && Object.keys(data[0]);
    console.log(data);
    return (
    <div className="tableDiv"> 
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
                      <td><Link to={`/uniPage/${row._id}`} className="link">{row[column]} </Link></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
  }