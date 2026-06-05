import { Image, StyleSheet, Text, View } from 'react-native';
import { formatDate } from '../utils/formatDate';

function findNextVacation(data, region) {
  const today = new Date();
  const content = data?.content?.[0];
  let next = null;

  content?.vacations.forEach((vacation) => {

    const regionData = vacation.regions.find((item) =>
      item.region.toLowerCase() === region.toLowerCase() ||
      (region.toLowerCase() === 'midden' && item.region.toLowerCase() === 'midden') ||
      (region.toLowerCase() === 'noord' && item.region.toLowerCase() === 'noord') ||
      (region.toLowerCase() === 'zuid' && item.region.toLowerCase() === 'zuid') ||
      (region.toLowerCase() === 'heel nederland' && item.region.toLowerCase() === 'heel nederland')
    );

    if (!regionData) {
      return;
    }

    const start = new Date(regionData.startdate);

    if (start >= today && (!next || start < new Date(next.startdate))) {
      next = { vacation, regionData };
    }
  });

  return next;
}

export default function CountdownScreen({ data, region }) {

  const next = findNextVacation(data, region);


  if (!next) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>Geen volgende vakantie gevonden</Text>
        <Text style={styles.text}>Controleer of het schooljaar of de regio goed staat.</Text>
      </View>
    );
  }


  const start = new Date(next.regionData.startdate); // Startdatum vakantie
  const now = new Date(); // Vandaag
  const daysLeft = Math.max(Math.ceil((start - now) / (1000 * 60 * 60 * 24)), 0); // Verschil in dagen

  const imageUri = imageByType[next.vacation.type] || 'https://via.placeholder.com/320x180.png?text=Vakantie';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volgende vakantie</Text>
      <Text style={styles.subtitle}>{next.vacation.type}</Text>
      <Text style={styles.regionLabel}>Regio: {region}</Text>


      <Image source={{ requiere: imageUri }} style={styles.image} />


      <Text style={styles.count}>Nog {daysLeft} dagen tot</Text>
      <Text style={styles.date}>
        {formatDate(next.regionData.startdate)} - {formatDate(next.regionData.enddate)}
      </Text>


      <Text style={styles.note}>Schooljaar: {data?.content?.[0]?.schoolyear}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  regionLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 12,
    borderRadius: 12,
  },
  count: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    marginBottom: 6,
  },
  note: {
    color: '#666',
    marginTop: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});