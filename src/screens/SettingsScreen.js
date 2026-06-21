import { ScrollView, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { getSchoolYears } from '../data/holidayData';


const years = getSchoolYears();

const regions = ['noord', 'midden', 'zuid', 'heel Nederland'];


export default function SettingsScreen({ region, schoolYear, onRegionChange, onYearChange, onLocate }) {
  const window = useWindowDimensions();
  const isLandscape = window.width > window.height;

  return (
    <ScrollView contentContainerStyle={[styles.container, isLandscape && styles.containerLandscape]}>
      <Text style={styles.title}>Instellingen</Text>
      
    
      <Text style={styles.label}>Huidige regio: {region}</Text>
      
    
      <TouchableOpacity style={[styles.gpsButton, isLandscape && styles.gpsButtonLandscape]} onPress={onLocate}>
        <Text style={styles.gpsText}>Bepaal regio met GPS</Text>
      </TouchableOpacity>

      <View style={[styles.sections, isLandscape && styles.sectionsLandscape]}>
        <View style={styles.section}>
          <Text style={styles.label}>Regio handmatig kiezen</Text>
          <View style={styles.buttonRow}>
            {regions.map((value) => (
              <TouchableOpacity
                key={value}
                style={[styles.optionButton, region === value && styles.optionButtonActive]}
                onPress={() => onRegionChange(value)} 
              >
                <Text style={[styles.optionText, region === value && styles.optionTextActive]}>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Schooljaar</Text>
          <View style={styles.buttonRow}>
            {years.map((value) => (
              <TouchableOpacity
                key={value}
                style={[styles.optionButton, schoolYear === value && styles.optionButtonActive]}
                onPress={() => onYearChange(value)} 
              >
                <Text style={[styles.optionText, schoolYear === value && styles.optionTextActive]}>
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  containerLandscape: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  gpsButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  gpsButtonLandscape: {
    maxWidth: 360,
  },
  gpsText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sections: {
    flexDirection: 'column',
  },
  sectionsLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    marginRight: 12,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  optionButtonActive: {
    
    borderColor: '#1a73e8',
    backgroundColor: '#e6f0ff',
  },
  optionText: {
    color: '#333',
  },
  optionTextActive: {
    
    color: '#1a73e8',
    fontWeight: '600',
  },
});
