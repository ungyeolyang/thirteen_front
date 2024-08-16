import { ResponsivePie } from "@nivo/pie";

// AdPie 컴포넌트
const AdPie = ({ data }) => {
  // 데이터 변환: COMMON과 KAKAO를 그룹화하여 각각의 비율을 계산
  const transformedData = [
    {
      id: "COMMON",
      label: "COMMON",
      value: data.filter((user) => user.social === "COMMON").length,
    },
    {
      id: "KAKAO",
      label: "KAKAO",
      value: data.filter((user) => user.social === "KAKAO").length,
    },
  ];

  return (
    <ResponsivePie
      data={transformedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      // 색상 및 스타일 정의
      colors={{ scheme: "nivo" }} // 기본 색상 팔레트 사용
      fill={[
        {
          match: {
            id: "COMMON", // COMMON 데이터에 대해 특정 색상 적용
          },
          id: "dots", // 패턴 적용 (선택 사항)
        },
        {
          match: {
            id: "KAKAO", // KAKAO 데이터에 대해 다른 색상 적용
          },
          id: "lines", // 패턴 적용 (선택 사항)
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default AdPie;
