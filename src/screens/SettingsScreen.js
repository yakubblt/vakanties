import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const years = ['2025-2026', '2024-2025'];

const regions = ['noord', 'midden', 'zuid', 'heel Nederland'];


export default function SettingsScreen({ region, schoolYear, onRegionChange, onYearChange, onLocate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instellingen</Text>
      
    
      <Text style={styles.label}>Huidige regio: {region}</Text>
      
    
      <TouchableOpacity style={styles.gpsButton} onPress={onLocate}>
        <Text style={styles.gpsText}>Bepaal regio met GPS</Text>
      </TouchableOpacity>

     
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
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
  gpsText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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