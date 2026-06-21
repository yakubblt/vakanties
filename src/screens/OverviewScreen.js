import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatDate } from '../utils/formatDate';


export default function OverviewScreen({ data, region }) {
 
  const content = data?.content?.[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <Text style={styles.title}>{content?.title}</Text>
      
   
      <Text style={styles.subtitle}>Schooljaar {content?.schoolyear}</Text>
      
      
      <Text style={styles.regionLabel}>Regio: {region}</Text>

      
      {content?.vacations.map((vacation, index) => (
        <View key={index} style={styles.card}>
          
          <Text style={styles.vacationType}>{vacation.type}</Text>
          
       
          <Text style={styles.smallText}>Verplicht: {vacation.compulsorydates}</Text>
          
       
          {vacation.regions.map((regionItem, regionIndex) => (
            <View key={regionIndex} style={styles.regionRow}>
             
              <Text style={styles.regionName}>{regionItem.region}</Text>
              
              <Text>
                {formatDate(regionItem.startdate)} - {formatDate(regionItem.enddate)}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  regionLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  card: {
    marginBottom: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  vacationType: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  smallText: {
    color: '#555',
    marginBottom: 8,
  },
  regionRow: {
    marginBottom: 6,
  },
  regionName: {
    fontWeight: '600',
  },
});
