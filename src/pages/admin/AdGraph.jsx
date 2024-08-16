import { ResponsiveLine } from "@nivo/line";
import { format, parseISO } from "date-fns";

const AdGraph = ({ data }) => {
  // 날짜별로 데이터를 그룹화
  const dateMap = data.reduce((acc, user) => {
    // mdate가 존재하지 않으면 무시
    if (!user.mdate) return acc;

    const dateKey = format(parseISO(user.mdate), "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = 0;
    }
    // 각 날짜에 해당하는 소셜 카운트를 누적
    acc[dateKey] += 1;
    return acc;
  }, {});

  // 변환된 데이터를 라인 차트 포맷으로 변경
  const transformedData = [
    {
      id: "Users", // COMMON과 KAKAO를 하나의 라인으로 통합
      data: Object.keys(dateMap).map((date) => ({
        x: date,
        y: dateMap[date],
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={transformedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "time", format: "%Y-%m-%d", precision: "day" }} // 날짜를 일 단위로 설정
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisBottom={{
        format: "%Y-%m-%d", // x축에 날짜를 일 단위로 포맷
        tickValues: "every 1 day", // 하루 단위로 틱 설정
        legend: "Date",
        legendOffset: -12,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickValues: 1, // y축을 1 단위로 설정
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Social Count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default AdGraph;
