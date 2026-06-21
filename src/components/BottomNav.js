import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

const screens = [
  { key: 'overview', label: 'Overzicht' },
  { key: 'countdown', label: 'Countdown' },
  { key: 'settings', label: 'Settings' },
  { key: 'about', label: 'About' },
];


export default function BottomNav({ selected, onChange }) {
  const window = useWindowDimensions();
  const isLandscape = window.width > window.height;

  return (
    <View style={[styles.navBar, isLandscape && styles.navBarLandscape]}>
      
      {screens.map((screen) => (
        <TouchableOpacity
          key={screen.key}
          
          style={[styles.button, isLandscape && styles.buttonLandscape, selected === screen.key && styles.buttonActive]}
         
          onPress={() => onChange(screen.key)}
        >
          <Text style={[styles.buttonText, selected === screen.key && styles.buttonTextActive]}>
            {screen.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row', // Knoppen naast elkaar
    justifyContent: 'space-between', 
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  navBarLandscape: {
    paddingVertical: 4,
  },
  button: {
    flex: 1, 
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonLandscape: {
    paddingVertical: 7,
  },
  buttonActive: {
  
    backgroundColor: '#e6f0ff',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
  },
  buttonTextActive: {
    
    color: '#1a73e8',
  },
});
