import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default function CModal({
  visible = false,
  title = "Title",
  message = "Message",
  OKHandler = () => {},
  CancelHandler = null,
}) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={OKHandler}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
            {CancelHandler && (
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={CancelHandler}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Black background with opacity
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 50,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
});
