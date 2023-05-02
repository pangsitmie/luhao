import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
// import { mockBarData } from 'src/data/mockData';



const BarChart = ({ data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const conData = data.map(item => ({
        x: item.x,
        y: 1, // Set y value to 1 if it is true, else set it to 0
        color: item.y ? colors.greenAccent[400] : colors.redAccent[800], // Set pastel green color if y value is true, else set pastel red color
        tooltip: item.y ? 'Connected' : 'Disconnected', // Add tooltip text based on item.y value
    }));

    // Function to format tick labels
    const formatTick = (value) => {
        // Format the tick label as desired
        const start = (value * 100).toFixed(0);
        const end = ((value + 0.01) * 100).toFixed(0);
        return `${start}.${end}`;
    };

    return (
        <ResponsiveBar
            data={conData}

            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    // line: null
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
                tooltip: {
                    container: {
                        color: colors.primary[500],
                    },
                },
            }
            }
            keys={["y"]}
            indexBy="x"
            tooltip={({ index }) => ( // Customize tooltip using a function
                <div style={{ color: colors.grey[100] }}>
                    {conData[index].tooltip}
                </div>
            )}
            padding={0}
            margin={{ top: 50, right: 50, bottom: 60, left: 50 }}
            valueScale={{ type: "linear" }}
            colors={({ index }) => conData[index].color} // Set color dynamically based on the 'color' property in the data array
            animate={true}
            enableLabel={false}
            axisTop={null}
            axisRight={null}
            axisLeft={null}
            axisBottom={{
                orient: "bottom",
                tickSize: 0,
                tickPadding: 6,
                tickRotation: 90,
                tickMargin: "0 0 0 1rem", // Adjust the left margin value to shift the ticks to the right
                // legend: "Time", // added
                // legendOffset: 36,
                // legendPosition: "middle",
                // how to make the tick move slightly to the right?

            }}
            enableGridX={false}
            enableGridY={false}
            height={220} // adjust the height of the chart
        />
    )
}

export default BarChart