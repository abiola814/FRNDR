{
  sampleCardArray.map((item, key) => (
    <Card
      key={key}
      item={item}
      removeCard={() => removeCard(item.id)}
      swipedDirection={lastSwipedDirection}
      navigation={navigation}
    />
  ));
}
{
  noMoreCard ? (
    // {/* {sampleCardArray.length === 0 ? ( */}
    <>
      <Text style={{ fontSize: 16, color: "black" }}>Cards are finished</Text>
      <TouchableOpacity
        onPress={() => {
          setSampleCardArray(DEMO_CONTENT);
          // setNoMoreCard(false);
          // console.log(sampleCardArray);
          console.log("length: ", LIST.length);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.primary,
          padding: 10,
          paddingHorizontal: 25,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <EvilIcons name="refresh" size={30} color="white" />
        <Text style={{ fontSize: 18, marginLeft: 5, color: "white" }}>
          Refresh
        </Text>
      </TouchableOpacity>
    </>
  ) : null;
}
