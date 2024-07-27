# react-multiselect-checkbox

A React component implementing multiple selection for checkbox inputs as well as other DOM elements.

[![NPM](https://img.shields.io/npm/v/react-multiselect-checkbox.svg)](https://www.npmjs.com/package/react-multiselect-checkbox)

<p align="center">
  <img src="https://raw.githubusercontent.com/tonix-tuft/react-multiselect-checkbox/master/example/img/react-multiselect-checkbox.gif" />
</p>

## Installation

```bash
npm install --save react-multiselect-checkbox
```

Install peer dependencies:

```bash
npm install --save react react-dom
```

## Usage

```jsx
import React, { Component } from "react";
import MultiselectCheckbox from "react-multiselect-checkbox";

class Example extends Component {
  render() {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>SURNAME</th>
              <th>
                <MultiselectCheckbox
                  checkboxes=".table .select-checkbox"
                  sync=".table .row"
                  onNotAllChecked={(selectedMap) => {
                    console.log("Not all checked", selectedMap.orderedByI());
                  }}
                  onAllChecked={(selectedMap) => {
                    console.log("All checked", selectedMap.orderedByI());
                  }}
                  onAllUnchecked={(selectedMap) => {
                    console.log("All unchecked", selectedMap.orderedByI());
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="row">
              <td>1</td>
              <td>John</td>
              <td>Richardson</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="1" />
              </td>
            </tr>
            <tr className="row">
              <td>2</td>
              <td>Terry</td>
              <td>Mitchell</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="2" />
              </td>
            </tr>
            <tr className="row">
              <td>3</td>
              <td>Emma</td>
              <td>Moore</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="3" />
              </td>
            </tr>
            <tr className="row">
              <td>4</td>
              <td>Larry</td>
              <td>Young</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="4" />
              </td>
            </tr>
            <tr className="row">
              <td>5</td>
              <td>Amanda</td>
              <td>Walker</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="5" />
              </td>
            </tr>
            <tr className="row">
              <td>6</td>
              <td>Sara</td>
              <td>Sullivan</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="6" />
              </td>
            </tr>
            <tr className="row">
              <td>7</td>
              <td>Tommy</td>
              <td>Green</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="7" />
              </td>
            </tr>
            <tr className="row">
              <td>8</td>
              <td>Scott</td>
              <td>Reyes</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="8" />
              </td>
            </tr>
            <tr className="row">
              <td>9</td>
              <td>Raimond</td>
              <td>Reed</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="9" />
              </td>
            </tr>
            <tr className="row">
              <td>10</td>
              <td>Sam</td>
              <td>Parker</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="10" />
              </td>
            </tr>
            <tr className="row">
              <td>11</td>
              <td>Peter</td>
              <td>Ortiz</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="11" />
              </td>
            </tr>
            <tr className="row">
              <td>12</td>
              <td>Olivia</td>
              <td>Garden</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="12" />
              </td>
            </tr>
            <tr className="row">
              <td>13</td>
              <td>Ava</td>
              <td>Mayer</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="13" />
              </td>
            </tr>
            <tr className="row">
              <td>14</td>
              <td>John</td>
              <td>Robinson</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="14" />
              </td>
            </tr>
            <tr className="row">
              <td>15</td>
              <td>Amelia</td>
              <td>Simpson</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="15" />
              </td>
            </tr>
            <tr className="row">
              <td>16</td>
              <td>Charlotte</td>
              <td>Martinez</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="16" />
              </td>
            </tr>
            <tr className="row">
              <td>17</td>
              <td>Sophia</td>
              <td>Jones</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="17" />
              </td>
            </tr>
            <tr className="row">
              <td>18</td>
              <td>Alfred</td>
              <td>Jackson</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="18" />
              </td>
            </tr>
            <tr className="row">
              <td>19</td>
              <td>Albert</td>
              <td>Hill</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="19" />
              </td>
            </tr>
            <tr className="row">
              <td>20</td>
              <td>Howard</td>
              <td>Foster</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="20" />
              </td>
            </tr>
            <tr className="row">
              <td>21</td>
              <td>Evelyn</td>
              <td>Evans</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="21" />
              </td>
            </tr>
            <tr className="row">
              <td>22</td>
              <td>Richard</td>
              <td>Davis</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="22" />
              </td>
            </tr>
            <tr className="row">
              <td>23</td>
              <td>Jim</td>
              <td>Brown</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="23" />
              </td>
            </tr>
            <tr className="row">
              <td>24</td>
              <td>Emily</td>
              <td>Campbell</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="24" />
              </td>
            </tr>
            <tr className="row">
              <td>25</td>
              <td>Ester</td>
              <td>González</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="25" />
              </td>
            </tr>
            <tr className="row">
              <td>26</td>
              <td>Charlotte</td>
              <td>De La Rosa</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="26" />
              </td>
            </tr>
            <tr className="row">
              <td>27</td>
              <td>Michael</td>
              <td>Wells</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="27" />
              </td>
            </tr>
            <tr className="row">
              <td>28</td>
              <td>Mila</td>
              <td>Young</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="28" />
              </td>
            </tr>
            <tr className="row">
              <td>29</td>
              <td>Kevin</td>
              <td>Harris</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="29" />
              </td>
            </tr>
            <tr className="row">
              <td>30</td>
              <td>Hannah</td>
              <td>Gray</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="30" />
              </td>
            </tr>
            <tr className="row">
              <td>31</td>
              <td>Clark</td>
              <td>Wayne</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="31" />
              </td>
            </tr>
            <tr className="row">
              <td>32</td>
              <td>Ellie</td>
              <td>Fisher</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="32" />
              </td>
            </tr>
            <tr className="row">
              <td>33</td>
              <td>Paul</td>
              <td>Phillips</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="33" />
              </td>
            </tr>
            <tr className="row">
              <td>34</td>
              <td>Anthony</td>
              <td>Wright</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="34" />
              </td>
            </tr>
            <tr className="row">
              <td>35</td>
              <td>Adam</td>
              <td>Baker</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="35" />
              </td>
            </tr>
            <tr className="row">
              <td>36</td>
              <td>Samantha</td>
              <td>Morris</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="36" />
              </td>
            </tr>
            <tr className="row">
              <td>37</td>
              <td>Peter</td>
              <td>Collins</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="37" />
              </td>
            </tr>
            <tr className="row">
              <td>38</td>
              <td>Lily</td>
              <td>Sweet</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="38" />
              </td>
            </tr>
            <tr className="row">
              <td>39</td>
              <td>Justin</td>
              <td>Cook</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="39" />
              </td>
            </tr>
            <tr className="row">
              <td>40</td>
              <td>Tim</td>
              <td>Bell</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="40" />
              </td>
            </tr>
            <tr className="row">
              <td>41</td>
              <td>Tom</td>
              <td>Clancy</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="41" />
              </td>
            </tr>
            <tr className="row">
              <td>42</td>
              <td>Frederique</td>
              <td>Darragon</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="42" />
              </td>
            </tr>
            <tr className="row">
              <td>43</td>
              <td>Jules</td>
              <td>Vern</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="43" />
              </td>
            </tr>
            <tr className="row">
              <td>44</td>
              <td>Amelia</td>
              <td>Simpson</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="44" />
              </td>
            </tr>
            <tr className="row">
              <td>45</td>
              <td>Mary</td>
              <td>Hold</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="45" />
              </td>
            </tr>
            <tr className="row">
              <td>46</td>
              <td>Valentino</td>
              <td>Rossi</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="46" />
              </td>
            </tr>
            <tr className="row">
              <td>47</td>
              <td>Peter</td>
              <td>Thrive</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="47" />
              </td>
            </tr>
            <tr className="row">
              <td>48</td>
              <td>Patrick</td>
              <td>Jamison</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="48" />
              </td>
            </tr>
            <tr className="row">
              <td>49</td>
              <td>Albert</td>
              <td>Collins</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="49" />
              </td>
            </tr>
            <tr className="row">
              <td>50</td>
              <td>John</td>
              <td>McKenty</td>
              <td>
                <input type="checkbox" className="select-checkbox" value="50" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
```

## License

MIT © [Anton Bagdatyev (Tonix)](https://github.com/tonix-tuft)
