import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const AnimatedPath = Animated.createAnimatedComponent(Path);

/**
 * Pantalla de "Modo Concentración" que implementa un temporizador Pomodoro con una animación de líquido.
 * El usuario puede seleccionar una duración, iniciar, pausar y reiniciar el temporizador.
 * La animación de una ola líquida sube para representar el progreso del tiempo.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @returns {React.ReactElement} El componente de la pantalla de concentración.
 */
export default function ConcentrationScreen({ navigation }) {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime, setTotalTime] = useState(25 * 60);
  
  const liquidHeight = useRef(new Animated.Value(0)).current;
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;
  const wave4 = useRef(new Animated.Value(0)).current;
  const wave5 = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);

  const timeOptions = [5, 10, 15, 25, 30, 45, 60];

  /**
   * Efecto para iniciar las animaciones de las olas en un bucle infinito.
   * Se ejecuta una sola vez cuando el componente se monta.
   */
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(wave1, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.timing(wave2, { toValue: 1, duration: 3000, useNativeDriver: true }),
        Animated.timing(wave3, { toValue: 1, duration: 3500, useNativeDriver: true }),
        Animated.timing(wave4, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(wave5, { toValue: 1, duration: 4500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  /**
   * Efecto que maneja el contador del temporizador.
   * Inicia un intervalo cuando `isRunning` es true y el tiempo no ha terminado.
   * Limpia el intervalo al pausar, al terminar o al desmontar el componente.
   */
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  /**
   * Efecto que actualiza la altura de la animación del líquido
   * basándose en el progreso del tiempo restante.
   */
  useEffect(() => {
    const progress = 1 - (timeLeft / totalTime);
    Animated.spring(liquidHeight, {
      toValue: progress * height,
      tension: 10,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [timeLeft]);

  /**
   * Inicia el temporizador con los minutos seleccionados.
   * Establece el tiempo total y restante, y activa el estado `isRunning`.
   */
  const handleStart = () => {
    setTotalTime(selectedMinutes * 60);
    setTimeLeft(selectedMinutes * 60);
    setIsRunning(true);
  };

  /**
   * Pausa o reanuda el temporizador.
   */
  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  /**
   * Reinicia el temporizador a su estado inicial con los minutos seleccionados.
   * Detiene el contador y resetea la animación del líquido.
   */
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedMinutes * 60);
    setTotalTime(selectedMinutes * 60);
    liquidHeight.setValue(0);
  };

  /**
   * Se ejecuta cuando el temporizador llega a cero.
   * Detiene el contador y muestra una alerta de finalización.
   */
  const handleFinish = () => {
    setIsRunning(false);
    alert('¡Felicidades! Completaste tu sesión de concentración 🎉');
  };

  /**
   * Formatea un número de segundos al formato "MM:SS".
   * @param {number} seconds - El total de segundos a formatear.
   * @returns {string} El tiempo formateado como una cadena de texto.
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wave1Y = wave1.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -200, 0, 200, 0],
  });

  const wave2Y = wave2.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 180, 0, -180, 0],
  });

  const wave3Y = wave3.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -160, 0, 160, 0],
  });

  const wave4Y = wave4.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 140, 0, -140, 0],
  });

  const wave5Y = wave5.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -120, 0, 120, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.liquidContainer,
          { 
            height: liquidHeight,
            bottom: 0,
          }
        ]}
      >
        <LinearGradient
          colors={['#FF5252', '#E91E63', '#C2185B', '#880E4F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.liquid}
        >
          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave1Y }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,200 Q${width * 0.125},50 ${width * 0.25},200 T${width * 0.5},200 T${width * 0.75},200 T${width},200 L${width},400 L0,400 Z`}
                fill="rgba(255, 82, 82, 0.6)"
              />
            </Svg>
          </Animated.View>

          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave2Y }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,200 Q${width * 0.125},350 ${width * 0.25},200 T${width * 0.5},200 T${width * 0.75},200 T${width},200 L${width},400 L0,400 Z`}
                fill="rgba(233, 30, 99, 0.5)"
              />
            </Svg>
          </Animated.View>

          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave3Y }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,200 Q${width * 0.1},80 ${width * 0.2},200 Q${width * 0.3},320 ${width * 0.4},200 Q${width * 0.5},80 ${width * 0.6},200 Q${width * 0.7},320 ${width * 0.8},200 Q${width * 0.9},80 ${width},200 L${width},400 L0,400 Z`}
                fill="rgba(194, 24, 91, 0.45)"
              />
            </Svg>
          </Animated.View>


          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave4Y }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,200 Q${width * 0.0833},300 ${width * 0.1666},200 Q${width * 0.25},100 ${width * 0.3333},200 Q${width * 0.4166},300 ${width * 0.5},200 Q${width * 0.5833},100 ${width * 0.6666},200 Q${width * 0.75},300 ${width * 0.8333},200 Q${width * 0.9166},100 ${width},200 L${width},400 L0,400 Z`}
                fill="rgba(136, 14, 79, 0.4)"
              />
            </Svg>
          </Animated.View>


          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave5Y }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,200 C${width * 0.1},100 ${width * 0.15},100 ${width * 0.25},200 C${width * 0.35},300 ${width * 0.4},300 ${width * 0.5},200 C${width * 0.6},100 ${width * 0.65},100 ${width * 0.75},200 C${width * 0.85},300 ${width * 0.9},300 ${width},200 L${width},400 L0,400 Z`}
                fill="rgba(255, 107, 107, 0.35)"
              />
            </Svg>
          </Animated.View>

          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave1Y }, { scale: 1.1 }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,250 Q${width * 0.16},120 ${width * 0.33},250 Q${width * 0.5},380 ${width * 0.66},250 Q${width * 0.83},120 ${width},250 L${width},400 L0,400 Z`}
                fill="rgba(255, 82, 82, 0.3)"
              />
            </Svg>
          </Animated.View>

          <Animated.View style={[styles.svgWave, { transform: [{ translateY: wave3Y }, { scale: 0.95 }] }]}>
            <Svg height="400" width={width} style={styles.waveSvg}>
              <Path
                d={`M0,250 Q${width * 0.125},350 ${width * 0.25},250 Q${width * 0.375},150 ${width * 0.5},250 Q${width * 0.625},350 ${width * 0.75},250 Q${width * 0.875},150 ${width},250 L${width},400 L0,400 Z`}
                fill="rgba(233, 30, 99, 0.25)"
              />
            </Svg>
          </Animated.View>
        </LinearGradient>
      </Animated.View>


      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        {isRunning || timeLeft !== totalTime ? (
          <View style={styles.topRightButtons}>
            <TouchableOpacity 
              style={styles.topButton}
              onPress={handlePause}
            >
              <Text style={styles.topButtonIcon}>
                {isRunning ? '⏸' : '▶️'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.topButton, { marginLeft: 10 }]}
              onPress={handleReset}
            >
              <Text style={styles.topButtonIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!isRunning && timeLeft === totalTime ? (
          <View style={styles.timeSelector}>
            <Text style={styles.title}>🧘 Modo Concentración</Text>
            <Text style={styles.selectorTitle}>¿Cuánto tiempo te vas a concentrar?</Text>
            
            <View style={styles.optionsContainer}>
              {timeOptions.map((minutes) => (
                <TouchableOpacity
                  key={minutes}
                  style={[
                    styles.timeOption,
                    selectedMinutes === minutes && styles.timeOptionSelected
                  ]}
                  onPress={() => setSelectedMinutes(minutes)}
                >
                  <Text style={[
                    styles.timeOptionText,
                    selectedMinutes === minutes && styles.timeOptionTextSelected
                  ]}>
                    {minutes}
                  </Text>
                  <Text style={[
                    styles.timeOptionLabel,
                    selectedMinutes === minutes && styles.timeOptionTextSelected
                  ]}>
                    min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.startButton}
              onPress={handleStart}
            >
              <LinearGradient
                colors={['#FF5252', '#FF6B6B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startButtonGradient}
              >
                <Text style={styles.startButtonText}>🚀 Comenzar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
              <Text style={styles.progressText}>
                {Math.round((1 - timeLeft / totalTime) * 100)}%
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  liquidContainer: {
    position: 'absolute',
    width: '100%',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  liquid: {
    flex: 1,
    width: '100%',
  },
  svgWave: {
    position: 'absolute',
    width: '100%',
    top: -200,
  },
  waveSvg: {
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 82, 82, 0.25)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 82, 82, 0.5)',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  topRightButtons: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
  },
  topButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 82, 82, 0.25)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 82, 82, 0.5)',
  },
  topButtonIcon: {
    fontSize: 22,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 82, 82, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  timeSelector: {
    width: '100%',
    alignItems: 'center',
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 50,
    gap: 15,
  },
  timeOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 82, 82, 0.3)',
  },
  timeOptionSelected: {
    backgroundColor: 'rgba(255, 82, 82, 0.25)',
    borderColor: '#FF5252',
    transform: [{ scale: 1.1 }],
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 15,
  },
  timeOptionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  timeOptionLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  timeOptionTextSelected: {
    color: '#FF6B6B',
    textShadowColor: 'rgba(255, 107, 107, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  startButton: {
    width: '80%',
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 20,
  },
  startButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  timerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    borderWidth: 8,
    borderColor: 'rgba(255, 82, 82, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 40,
    elevation: 25,
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 82, 82, 0.9)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
  },
  progressText: {
    fontSize: 24,
    color: '#FF6B6B',
    marginTop: 10,
    fontWeight: '600',
  },
});