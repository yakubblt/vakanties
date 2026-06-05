import { Image, StyleSheet, Text, View } from 'react-native';


export default function AboutScreen() {
  return (
    <View style={styles.container}>
   
      <Text style={styles.title}>About</Text>

     
      <Image
        source={require('../../assets/IMG_0405.jpg')}
        style={styles.photo}
      />

      <Text style={styles.text}>
        Ik ben Yakub Bulut en ik ben een student aan de het Deltion college zwolle ik volg de opleiding software developer.
      </Text>
      <Text style={styles.text}>
        In deze mobil app heb ik gebouwd hoe je de volgende vakantie kan zien en hoeveel dagen er nog zijn tot de volgende vakantie.
      </Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
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
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  smallText: {
    marginTop: 8,
    color: '#555',
    textAlign: 'center',
  },
});