import React from 'react'
import "./covidnews.css"
import Axios from "axios";
import numeral from "numeral";
function CovidNews() {
    const [cases, setCases] = React.useState([]);
    React.useEffect(() => {
        getdata();

    }, [])
    const getdata = async () => {
        try {
            const response = await Axios.get("https://disease.sh/v3/covid-19/countries");
            if (response.status == 200 || 304) {
                setCases(Sort(response.data));
            }
        }
        catch (err) {
            alert(err.message);
        }

    }
    function Sort(data) {
        const sorteddata = [...data];
        return sorteddata.sort((a, b) => { return (b.cases - a.cases) })

    }
    return (
        <div className="covidnews">
            <h1 style={{ textAlign: "center", padding: 10, border: '2px solid lightgray', borderRadius: 5 }}>Total Covid Cases</h1>
            <tr>
                <th>Country</th>
                <th>Cases</th>
            </tr>
            {cases.map((country) => (
                <tr>
                    <td>{country.country}</td>
                    <td>
                        <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}

        </div>
    )
}

export default CovidNews
