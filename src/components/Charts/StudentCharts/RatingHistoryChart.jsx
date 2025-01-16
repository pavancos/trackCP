import React from 'react';
import {
  XYChart,
  Axis,
  Grid,
  LineSeries,
  Tooltip,
  darkTheme,
} from '@visx/xychart';
import { curveMonotoneX } from '@visx/curve';

const RatingHistoryChart = () => {
  // Process the data for each platform
  const processContestData = () => {
    const leetcodeData = [
      {"date":"02-09-23", "rating":1498},
      {"date":"16-09-23", "rating":1466},
      {"date":"06-01-24", "rating":1479},
      {"date":"07-01-24", "rating":1469},
      {"date":"14-01-24", "rating":1474},
      {"date":"20-01-24", "rating":1447},
      {"date":"21-01-24", "rating":1437},
      {"date":"28-01-24", "rating":1453},
      {"date":"04-02-24", "rating":1427},
      {"date":"11-02-24", "rating":1402},
      {"date":"17-02-24", "rating":1416},
      {"date":"18-02-24", "rating":1401},
      {"date":"25-02-24", "rating":1377},
      {"date":"02-03-24", "rating":1468},
      {"date":"03-03-24", "rating":1507},
      {"date":"09-06-24", "rating":1478},
      {"date":"22-06-24", "rating":1461},
      {"date":"06-07-24", "rating":1471},
      {"date":"20-07-24", "rating":1447},
      {"date":"21-07-24", "rating":1440},
      {"date":"03-08-24", "rating":1423},
      {"date":"31-08-24", "rating":1393},
      {"date":"01-09-24", "rating":1365},
      {"date":"22-09-24", "rating":1348},
      {"date":"28-09-24", "rating":1329},
      {"date":"29-09-24", "rating":1318},
      {"date":"06-10-24", "rating":1310},
      {"date":"12-10-24", "rating":1303},
      {"date":"13-10-24", "rating":1297},
      {"date":"20-10-24", "rating":1310},
      {"date":"23-11-24", "rating":1300},
      {"date":"21-12-24", "rating":1295}
    ].map(d => ({
      date: new Date(d.date.split('-').reverse().join('-')),
      rating: d.rating,
      platform: 'LeetCode'
    }));

    const codeforcesData = [
      {"date":"28-12-23", "rating":378},
      {"date":"06-01-24", "rating":605},
      {"date":"19-02-24", "rating":757},
      {"date":"03-06-24", "rating":809},
      {"date":"11-06-24", "rating":847},
      {"date":"23-06-24", "rating":826},
      {"date":"30-06-24", "rating":728},
      {"date":"11-07-24", "rating":685},
      {"date":"26-07-24", "rating":659},
      {"date":"06-08-24", "rating":697},
      {"date":"21-09-24", "rating":651},
      {"date":"15-12-24", "rating":600}
    ].map(d => ({
      date: new Date(d.date.split('-').reverse().join('-')),
      rating: d.rating,
      platform: 'CodeForces'
    }));

    const codechefData = [
      {"date":"13-09-23", "rating":1031},
      {"date":"20-09-23", "rating":1101},
      {"date":"01-11-23", "rating":1117},
      {"date":"27-12-23", "rating":1136},
      {"date":"03-01-24", "rating":1203},
      {"date":"10-01-24", "rating":1207},
      {"date":"17-01-24", "rating":1196},
      {"date":"24-01-24", "rating":930},
      {"date":"31-01-24", "rating":976},
      {"date":"07-02-24", "rating":979},
      {"date":"14-02-24", "rating":1031},
      {"date":"21-02-24", "rating":1086},
      {"date":"06-03-24", "rating":1153},
      {"date":"13-03-24", "rating":1129},
      {"date":"20-03-24", "rating":1157},
      {"date":"27-03-24", "rating":1156},
      {"date":"03-04-24", "rating":1129},
      {"date":"10-04-24", "rating":1084},
      {"date":"29-05-24", "rating":1117},
      {"date":"05-06-24", "rating":1125},
      {"date":"12-06-24", "rating":1083},
      {"date":"19-06-24", "rating":1118},
      {"date":"26-06-24", "rating":1115},
      {"date":"03-07-24", "rating":1129},
      {"date":"10-07-24", "rating":1141},
      {"date":"17-07-24", "rating":1102},
      {"date":"24-07-24", "rating":1102},
      {"date":"31-07-24", "rating":1068},
      {"date":"07-08-24", "rating":1047},
      {"date":"21-08-24", "rating":1076},
      {"date":"28-08-24", "rating":1041},
      {"date":"04-09-24", "rating":1065},
      {"date":"11-09-24", "rating":1027},
      {"date":"18-09-24", "rating":1033},
      {"date":"25-09-24", "rating":986},
      {"date":"02-10-24", "rating":994},
      {"date":"09-10-24", "rating":1030},
      {"date":"16-10-24", "rating":1000},
      {"date":"11-12-24", "rating":1001},
      {"date":"18-12-24", "rating":1036},
      {"date":"25-12-24", "rating":1068}
    ].map(d => ({
      date: new Date(d.date.split('-').reverse().join('-')),
      rating: d.rating,
      platform: 'CodeChef'
    }));

    return { leetcodeData, codeforcesData, codechefData };
  };

  const { leetcodeData, codeforcesData, codechefData } = processContestData();

  const accessors = {
    xAccessor: d => d.date,
    yAccessor: d => d.rating,
  };

  return (
    <div className="w-full h-96 bg-white p-4">
      <XYChart
        height={400}
        xScale={{ type: 'time' }}
        yScale={{ type: 'linear', nice: true }}
        theme={darkTheme}
      >
        <Grid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: '#e0e0e0',
            strokeWidth: 1,
            strokeDasharray: '4,4',
          }}
        />
        <Axis
          orientation="bottom"
          tickFormat={date => date.toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit'
          })}
          tickLabelProps={() => ({
            angle: -45,
            textAnchor: 'end',
            dy: 10
          })}
        />
        <Axis
          orientation="left"
          label="Rating"
          labelOffset={40}
        />
        
        <LineSeries
          data={leetcodeData}
          dataKey="LeetCode"
          {...accessors}
          curve={curveMonotoneX}
          stroke="#FF8C00"
          strokeWidth={2}
        />
        <LineSeries
          data={codeforcesData}
          dataKey="CodeForces"
          {...accessors}
          curve={curveMonotoneX}
          stroke="#1E90FF"
          strokeWidth={2}
        />
        <LineSeries
          data={codechefData}
          dataKey="CodeChef"
          {...accessors}
          curve={curveMonotoneX}
          stroke="#32CD32"
          strokeWidth={2}
        />

        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          renderTooltip={({ tooltipData }) => {
            const datum = tooltipData.nearestDatum.datum;
            return (
              <div className="p-2 bg-gray-800 text-white rounded shadow-lg">
                <div className="font-bold">
                  {datum.date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div style={{ color: tooltipData.nearestDatum.key === 'LeetCode' ? '#FF8C00' : 
                                    tooltipData.nearestDatum.key === 'CodeForces' ? '#1E90FF' : '#32CD32' }}>
                  {tooltipData.nearestDatum.key}: {datum.rating}
                </div>
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
};

export default RatingHistoryChart;