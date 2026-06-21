import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { formatDate } from '../utils/formatDate';

const imageByType = {
  default: 'https://via.placeholder.com/320x180.png?text=Vakantie',
};

function findNextVacation(data, region) {
  const today = new Date();
  const content = data?.content?.[0];
  let next = null;

  content?.vacations.forEach((vacation) => {

    const selectedRegion = region.toLowerCase();
    const regionData = vacation.regions.find((item) => item.region.toLowerCase() === selectedRegion)
      || vacation.regions.find((item) => item.region.toLowerCase() === 'heel nederland');

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

  const window = useWindowDimensions();
  const isLandscape = window.width > window.height;
  const next = findNextVacation(data, region);


  if (!next) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>Geen volgende vakantie gevonden</Text>
        <Text style={styles.text}>Deze vakantie is al verlopen.</Text>
      </View>
    );
  }


  const start = new Date(next.regionData.startdate); // Startdatum vakantie
  const now = new Date(); // Vandaag
  const daysLeft = Math.max(Math.ceil((start - now) / (1000 * 60 * 60 * 24)), 0); // Verschil in dagen

  const imageUri = imageByType[next.vacation.type] || 'https://via.placeholder.com/320x180.png?text=Vakantie';

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <Image source={{ uri: imageUri }} style={[styles.image, isLandscape && styles.imageLandscape]} />

      <View style={[styles.infoPanel, isLandscape && styles.infoPanelLandscape]}>
        <Text style={styles.title}>Volgende vakantie</Text>
        <Text style={styles.subtitle}>{next.vacation.type}</Text>
        <Text style={styles.regionLabel}>Regio: {region}</Text>

        <Text style={styles.count}>Nog {daysLeft} dagen tot</Text>
        <Text style={styles.date}>
          {formatDate(next.regionData.startdate)} - {formatDate(next.regionData.enddate)}
        </Text>

        <Text style={styles.note}>Schooljaar: {data?.content?.[0]?.schoolyear}</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  infoPanel: {
    alignItems: 'center',
    width: '100%',
  },
  infoPanelLandscape: {
    alignItems: 'flex-start',
    flex: 1,
    paddingLeft: 20,
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
  imageLandscape: {
    flex: 1,
    maxWidth: 360,
    height: 210,
    marginBottom: 0,
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
