import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';


export default function AboutScreen() {
  const window = useWindowDimensions();
  const isLandscape = window.width > window.height;

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
   
      <Text style={styles.title}>About</Text>

      <View style={[styles.content, isLandscape && styles.contentLandscape]}>
        <Image
          source={require('../../assets/IMG_0405.jpg')}
          style={[styles.photo, isLandscape && styles.photoLandscape]}
        />

        <View style={[styles.textGroup, isLandscape && styles.textGroupLandscape]}>
          <Text style={[styles.text, isLandscape && styles.textLandscape]}>
            Ik ben Yakub Bulut en ik ben een student aan de het Deltion college zwolle ik volg de opleiding software developer.
          </Text>
          <Text style={[styles.text, isLandscape && styles.textLandscape]}>
            In deze mobil app heb ik gebouwd hoe je de volgende vakantie kan zien en hoeveel dagen er nog zijn tot de volgende vakantie.
          </Text>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  containerLandscape: {
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  photo: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 16,
  },
  photoLandscape: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 0,
    marginRight: 24,
  },
  content: {
    alignItems: 'center',
  },
  contentLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 760,
  },
  textGroup: {
    alignItems: 'center',
  },
  textGroupLandscape: {
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  textLandscape: {
    textAlign: 'left',
  },
  smallText: {
    marginTop: 8,
    color: '#555',
    textAlign: 'center',
  },
});
