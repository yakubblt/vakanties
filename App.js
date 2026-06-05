import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import BottomNav from './src/components/BottomNav';
import OverviewScreen from './src/screens/OverviewScreen';
import CountdownScreen from './src/screens/CountdownScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import { getHolidayData } from './src/data/holidayData';
import apiData from './src/data/api-mobile.json'; // Importeer de lokale API-data

// Instellingen die we opslaan
const STORAGE_KEY = 'vakantieSettings';
const defaultRegion = 'midden'; // Standaard regio
const defaultYear = '2025-2026'; // Standaard schooljaar

// Functie om regio te bepalen op basis van breedtegraad (latitude)
// Noord = bovenkant Nederland (>= 52.5)
// Midden = midden (>= 52.0)
// Zuid = zuidkant (< 52.0)
function getRegionFromCoords(latitude) {
  if (latitude >= 52.5) return 'noord';
  if (latitude >= 52.0) return 'midden';
  return 'zuid';
}

export default function App() {
  // State: huidige scherm (overview, countdown, settings, about)
  const [currentScreen, setCurrentScreen] = useState('overview');
  
  // State: gekozen regio
  const [region, setRegion] = useState(defaultRegion);
  
  // State: gekozen schooljaar
  const [schoolYear, setSchoolYear] = useState(defaultYear);
  
  // State: alle vakantiegegevens
  const [holidays, setHolidays] = useState(getHolidayData(defaultYear));
  
  // State: is app nog aan het laden?
  const [loading, setLoading] = useState(true);
  
  // State: bericht voor gebruiker (bv. "Regio bepaald!")
  const [message, setMessage] = useState('');
  
  // Detecteer of scherm in landscape-modus is
  const window = useWindowDimensions();
  const isLandscape = window.width > window.height;

  // Effect: Laad instellingen en vakantiedata bij app-start
  useEffect(() => {
    async function loadSettings() {
      try {
        // Haal opgeslagen instellingen op
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setRegion(parsed.region || defaultRegion);
          setSchoolYear(parsed.schoolYear || defaultYear);
        }
      } catch (error) {
        console.log('Fout bij laden instellingen:', error);
      }
    }

    async function fetchHolidayData() {
      try {
        // Laad data van lokaal JSON-bestand (api-mobile.json)
        setHolidays(apiData);
      } catch (error) {
        console.log('Fout bij laden vakantiedata:', error);
        // Fallback naar hardcoded data als het misgaat
        setHolidays(getHolidayData(defaultYear));
      } finally {
        // App klaar met laden
        setLoading(false);
      }
    }

    loadSettings(); // Laad vorige instellingen
    fetchHolidayData(); // Laad vakantiedata
  }, []); // [] = alleen bij app-start

  // Effect: Sla instellingen op wanneer ze veranderen
  useEffect(() => {
    async function saveSettings() {
      try {
        // Sla regio en schooljaar op in lokale opslag
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ region, schoolYear })
        );
      } catch (error) {
        console.log('Fout bij opslaan instellingen:', error);
      }
    }

    saveSettings();
  }, [region, schoolYear]); // Sla op wanneer regio of jaar verandert

  // Functie: Bepaal regio automatisch via GPS
  async function handleLocatePress() {
    setMessage('Vraag locatie op...');

    try {
      // Vraag toestemming voor locatie
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMessage('Locatieverzoek geweigerd. Geef toestemming in je instellingen.');
        return;
      }

      // Haal huidige positie op
      const location = await Location.getCurrentPositionAsync({});
      
      // Bepaal regio op basis van breedtegraad
      const newRegion = getRegionFromCoords(location.coords.latitude);
      setRegion(newRegion);
      setMessage(`Regio automatisch gekozen: ${newRegion}`);
    } catch (error) {
      setMessage('Kan locatie niet ophalen. Probeer opnieuw.');
      console.log(error);
    }
  }

  // Functie: Verander schooljaar en laad nieuwe vakantiedata
  function handleYearChange(value) {
    setSchoolYear(value);
    // Bij schooljaarwissel fallback naar lokale data
    setHolidays(getHolidayData(value));
  }

  // Functie: Kies welk scherm te tonen
  function renderScreen() {
    if (currentScreen === 'overview') {
      return <OverviewScreen data={holidays} region={region} />;
    }
    if (currentScreen === 'countdown') {
      return <CountdownScreen data={holidays} region={region} />;
    }
    if (currentScreen === 'settings') {
      return (
        <SettingsScreen
          region={region}
          schoolYear={schoolYear}
          onRegionChange={setRegion}
          onYearChange={handleYearChange}
          onLocate={handleLocatePress}
        />
      );
    }
    return <AboutScreen />;
  }

  // Toon laadscherm terwijl app aan het starten is
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Instellingen laden...</Text>
      </SafeAreaView>
    );
  }

  // Render: Volledige app-interface
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header met titel en huidge regio */}
      <View style={[styles.header, isLandscape && styles.headerLandscape]}>
        <Text style={styles.headerTitle}>Schoolvakantie App</Text>
        <Text style={styles.headerRegion}>Regio: {region}</Text>
      </View>
      
      {/* Bericht (bijv. bij GPS) */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      
      {/* Het huident scherm (overview, countdown, settings, about) */}
      <View style={styles.screenContainer}>{renderScreen()}</View>
      
      {/* Onderkant navigatie met 4 knoppen */}
      <BottomNav selected={currentScreen} onChange={setCurrentScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    padding: 16,
    backgroundColor: '#1a73e8',
  },
  headerLandscape: {
    // In landscape-modus: zet header elements naast elkaar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRegion: {
    color: '#fff',
    marginTop: 8,
    fontSize: 16,
  },
  message: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#333',
    backgroundColor: '#eef6ff',
  },
  screenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});
