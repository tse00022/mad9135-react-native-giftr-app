import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { useContext, useRef } from "react";
import PeopleContext from "../PeopleContext";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import CModal from "../components/CModal";
import Feather from '@expo/vector-icons/Feather';

export default IdeaScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const { id, name } = route.params;
  const { saveIdea } = useContext(PeopleContext);
  const cameraRef = useRef(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoPath, setPhotoPath] = useState("");
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const ASPECT_RATIO = 2 / 3;
  const [photoWidth, setPhotoWidth] = useState(0);
  const [photoHeight, setPhotoHeight] = useState(0);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleFacing() {
    console.log(facing);
    setFacing(facing === "front" ? "back" : "front");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{ fontSize: 26 }}>{`Add Idea for ${name}`}</Text>

        {/* Name Input */}
        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Gift Idea</Text>
          <TextInput
            style={{
              fontSize: 20,
              borderBottomColor: "grey",
              borderBottomWidth: 2,
            }}
            value={text}
            onChangeText={setText}
          />
        </View>

        {/* Camera View */}
        {photoTaken ? (
          <Image source={{ uri: photoPath }} style={{ flex: 1 }} />
        ) : (
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={async () => {
                  const width = Math.floor(Dimensions.get("window").width / 2);
                  const height = Math.floor(width / ASPECT_RATIO);
                  setPhotoHeight(height);
                  setPhotoWidth(width);
                  //Take a photo
                  if (cameraRef) {
                    const options = {
                      quality: 0.5,
                      pictureSize: `${width}x${height}`,
                    };
                    console.log(options);
                    const data = await cameraRef.current.takePictureAsync(
                      options
                    );
                    console.log(data.uri); // Do something with the captured photo (e.g., upload, display)
                    setPhotoPath(data.uri);
                    setPhotoTaken(true);
                  }
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Feather name="camera" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        )}

        {/* Controls */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              if (text.trim() === "") {
                setModalMessage("A gift idea should not be empty");
                setShowModal(true);
                return;
              }
              if (!photoTaken) {
                setModalMessage("Please take a photo of the gift");
                setShowModal(true);
                return;
              }

              saveIdea(id, text, photoPath, photoWidth, photoHeight);
              navigation.goBack();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              backgroundColor: "skyblue",
              marginBottom: 10,
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              backgroundColor: "red",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <CModal
          visible={showModal}
          title="Field required"
          message={modalMessage}
          OKHandler={() => {
            setShowModal(false);
            setModalMessage("");
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    margin: "10%",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
