import { ResponsiveLine } from "@nivo/line";
import { format, parseISO } from "date-fns";

const AdGraph = ({ data }) => {
  // 소셜 타입 별로 데이터 그룹화 및 날짜 파싱
  const transformedData = ["COMMON", "KAKAO"].map((socialType) => ({
    id: socialType,
    data: data
      .filter((user) => user.social === socialType)
      .map((user) => ({
        x: format(parseISO(user.mdate), "yyyy-MM-dd"), // x축에 날짜를 일 단위로 표시
        y: 1, // 각 소셜 타입을 1로 계산
      })),
  }));

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
