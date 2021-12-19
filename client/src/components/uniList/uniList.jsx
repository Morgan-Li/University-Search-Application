import "./uniList.css";

export default function uniList() {
    return (
        <div> 
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
        </div>
    );
  }