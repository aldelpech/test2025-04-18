
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const sampleData = [
  { year: 2018, France: 11.5, Germany: 4.0, Spain: 6.0 },
  { year: 2019, France: 12.3, Germany: 4.2, Spain: 6.2 },
  { year: 2020, France: 13.8, Germany: 4.5, Spain: 6.5 },
  { year: 2021, France: 15.0, Germany: 4.7, Spain: 6.7 },
  { year: 2022, France: 16.1, Germany: 4.9, Spain: 6.9 },
  { year: 2023, France: 17.3, Germany: 5.0, Spain: 7.0 },
  { year: 2024, France: 14.6, Germany: 5.1, Spain: 7.1 },
];

const countryMeta = {
  France: { label: 'France (réel)', real: true },
  Germany: { label: 'Germany (fictif)', real: false },
  Spain: { label: 'Spain (fictif)', real: false },
};

const availableCountries = Object.keys(countryMeta);

export default function SalaireMinimumChart() {
  const [selectedCountries, setSelectedCountries] = useState(['France', 'Germany']);
  const [yearRange, setYearRange] = useState([2018, 2024]);

  const filteredData = sampleData.filter(
    (d) => d.year >= yearRange[0] && d.year <= yearRange[1]
  );

  const handleCheckboxChange = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleYearChange = (e, index) => {
    const value = parseInt(e.target.value, 10);
    const newRange = [...yearRange];
    newRange[index] = value;
    setYearRange(newRange);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Population active au salaire minimum (%)
      </h2>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Choisissez les pays :</strong></label><br />
        {availableCountries.map((country) => (
          <label key={country} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={selectedCountries.includes(country)}
              onChange={() => handleCheckboxChange(country)}
            />{' '}
            {countryMeta[country].label}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Période :</strong></label><br />
        De :
        <input
          type="number"
          min="2018"
          max="2024"
          value={yearRange[0]}
          onChange={(e) => handleYearChange(e, 0)}
          style={{ margin: '0 10px' }}
        />
        à :
        <input
          type="number"
          min="2018"
          max="2024"
          value={yearRange[1]}
          onChange={(e) => handleYearChange(e, 1)}
          style={{ margin: '0 10px' }}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <XAxis dataKey="year" />
          <YAxis unit="%" />
          <Tooltip />
          <Legend />
          {selectedCountries.map((country) => (
            <Line
              key={country}
              type="monotone"
              dataKey={country}
              name={countryMeta[country].label}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#555' }}>
        Données marquées comme "fictif" sont des estimations illustratives.
      </p>
    </div>
  );
}
