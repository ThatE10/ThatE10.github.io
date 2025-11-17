---
# _pages/sequence-completion.md
# Save this file in your _pages directory

layout: single
title: "Sequence Completion Algorithm"
permalink: /sequence-completion/
author_profile: true
classes: wide
---

<div id="sequence-app-root"></div>

<style>
#sequence-app-root {
  min-height: 80vh;
}

.sequence-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.sequence-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.sequence-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

.sequence-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.sequence-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  background: #ccc !important;
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-add {
  background: #10b981;
  color: white;
}

.btn-add:hover:not(:disabled) {
  background: #059669;
}

.btn-remove {
  background: #ef4444;
  color: white;
}

.btn-remove:hover:not(:disabled) {
  background: #dc2626;
}

.btn-predict {
  background: #fb923c;
  color: white;
}

.btn-predict:hover:not(:disabled) {
  background: #f97316;
}

.sequence-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 8px;
  row-gap: 5rem;
}

.sequence-box-container {
  position: relative;
}

.sequence-box {
  width: 80px;
  height: 50px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  transition: all 0.3s;
}

.sequence-box.placeholder {
  border-color: #e5e7eb;
  background: #f9fafb;
}

.sequence-box input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  background: transparent;
  color: #1f2937;
}

.sequence-box.placeholder input {
  color: #9ca3af;
}

.sequence-box input::placeholder {
  color: #9ca3af;
}

.sequence-box.predicted {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.sequence-box.predicted .predicted-value {
  color: white;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

.prediction-history {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.prediction-item {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: white;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  text-align: center;
  min-width: 60px;
  transition: opacity 0.5s;
}

.sequence-info {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.sequence-info .placeholder-text {
  color: #9ca3af;
}

.processing-banner {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1e40af;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #2563eb;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.processing-text {
  flex: 1;
}

.processing-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.processing-subtitle {
  font-size: 0.875rem;
  color: #2563eb;
}

.results-summary {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #d1fae5;
  border: 1px solid #6ee7b7;
  border-radius: 8px;
}

.results-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 0.75rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.result-card {
  background: white;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #6ee7b7;
}

.result-value {
  font-weight: 600;
  color: #047857;
  margin-bottom: 0.5rem;
}

.result-details {
  font-size: 0.75rem;
  color: #059669;
}

.result-details > div {
  margin-bottom: 0.25rem;
}

.chart-container {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.chart-header {
  margin-bottom: 0.75rem;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.chart-subtitle {
  font-size: 0.75rem;
  color: #6b7280;
}

.chart-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  background: white;
  border-radius: 4px;
  padding: 0.5rem;
}

#sigma-chart {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  width: calc(100% - 1rem) !important;
  height: calc(100% - 1rem) !important;
}

.settings-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.settings-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  transition: color 0.2s;
}

.settings-toggle:hover {
  color: #1f2937;
}

.settings-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s;
}

.settings-toggle.open svg.chevron {
  transform: rotate(180deg);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.settings-field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.settings-field input,
.settings-field select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
}

.settings-field input:focus,
.settings-field select:focus {
  outline: none;
  border-color: #3b82f6;
}

.rank-helper-text {
  display: block;
  margin-top: 0.25rem;
  color: #6b7280;
  font-size: 0.75rem;
}

.error-banner {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  color: #991b1b;
}
</style>

<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<script type="text/babel">
const { useState, useEffect, useRef } = React;

const SequenceCompletionUI = () => {
  const [sequence, setSequence] = useState([1, 1, NaN, 3, 5]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    tolerance: 1e-8,
    rank: 2,
    max_iters: 1000,
    mean_type: 'geometric'
  });
  const [missingIndices, setMissingIndices] = useState([2]);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [sigmaHistory, setSigmaHistory] = useState([]);
  
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // API endpoint - update this to your actual API URL
  const API_URL = 'http://127.0.0.1:8080/predict/stream';

  // Calculate observed values count and max rank
  const observedCount = sequence.filter(val => !isNaN(val)).length;
  const maxRank = Math.max(1, Math.floor(observedCount / 2));

  useEffect(() => {
    const missing = [];
    sequence.forEach((val, idx) => {
      if (isNaN(val)) missing.push(idx);
    });
    setMissingIndices(missing);
    
    if (settings.rank > maxRank) {
      setSettings(prev => ({ ...prev, rank: maxRank }));
    }
  }, [sequence, maxRank, settings.rank]);

  // Initialize and update chart
  useEffect(() => {
    if (!chartRef.current || sigmaHistory.length === 0) {
      // Clear chart if no data
      if (chartInstanceRef.current && sigmaHistory.length === 0) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Determine how many sigma values we have
    const maxSigmaCount = Math.max(...sigmaHistory.map(h => h.sigma.length));
    const datasets = [];
    
    // Create a dataset for each sigma index (σ1, σ2, σ3, etc.)
    for (let sigmaIdx = 0; sigmaIdx < maxSigmaCount; sigmaIdx++) {
      // Collect all iterations where this sigma exists
      const points = [];
      
      sigmaHistory.forEach((historyEntry, iterationIdx) => {
        if (historyEntry.sigma[sigmaIdx] !== undefined) {
          points.push({
            x: historyEntry.iteration,
            y: historyEntry.sigma[sigmaIdx]
          });
        }
      });
      
      // Skip if no data for this sigma
      if (points.length === 0) continue;
      
      // Calculate color with golden angle for distribution
      const hue = (sigmaIdx * 137.5) % 360;
      
      // Create dataset with varying point opacity based on iteration recency
      datasets.push({
        label: `σ${sigmaIdx + 1}`,
        data: points,
        borderColor: `hsla(${hue}, 70%, 50%, 0.8)`,
        backgroundColor: `hsla(${hue}, 70%, 50%, 0.2)`,
        borderWidth: 2,
        pointRadius: (context) => {
          // Make recent points larger
          const dataIndex = context.dataIndex;
          const totalPoints = points.length;
          const recencyFactor = (dataIndex + 1) / totalPoints;
          return 2 + recencyFactor * 3;
        },
        pointBackgroundColor: (context) => {
          // Fade older points
          const dataIndex = context.dataIndex;
          const totalPoints = points.length;
          const recencyFactor = (dataIndex + 1) / totalPoints;
          const opacity = 0.2 + recencyFactor * 0.8; // Range from 0.2 to 1.0
          return `hsla(${hue}, 70%, 50%, ${opacity})`;
        },
        pointBorderColor: (context) => {
          const dataIndex = context.dataIndex;
          const totalPoints = points.length;
          const recencyFactor = (dataIndex + 1) / totalPoints;
          const opacity = 0.3 + recencyFactor * 0.7;
          return `hsla(${hue}, 70%, 50%, ${opacity})`;
        },
        pointHoverRadius: 6,
        tension: 0.2,
        fill: false,
        // Make line segments fade with age
        segment: {
          borderColor: (context) => {
            const fromIdx = context.p0DataIndex;
            const totalPoints = points.length;
            const recencyFactor = (fromIdx + 1) / totalPoints;
            const opacity = 0.3 + recencyFactor * 0.7;
            return `hsla(${hue}, 70%, 50%, ${opacity})`;
          }
        }
      });
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 15,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: function(context) {
                return `Iteration ${context[0].parsed.x}`;
              },
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y.toExponential(4)}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Iteration',
              font: { 
                weight: 'bold',
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              precision: 0
            }
          },
          y: {
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Singular Values (σ)',
              font: { 
                weight: 'bold',
                size: 12
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                // Format as powers of 10 for clean display
                const log = Math.log10(value);
                if (Math.abs(log - Math.round(log)) < 0.1) {
                  return value.toExponential(0);
                }
                return null;
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        animation: {
          duration: 300
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [sigmaHistory]);

  const handleBoxInput = (index, value) => {
    setIsPlaceholder(false);
    const newSequence = [...sequence];
    
    const separators = /[,;\s]/;
    if (separators.test(value)) {
      const numPart = value.replace(separators, '').trim();
      
      if (numPart === '' || numPart === '?') {
        newSequence[index] = NaN;
      } else {
        const num = parseFloat(numPart);
        newSequence[index] = isNaN(num) ? NaN : num;
      }
      
      setSequence(newSequence);
      setPredictionHistory({});
      setSigmaHistory([]);
      
      setTimeout(() => {
        if (index + 1 < sequence.length) {
          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
          if (nextInput) nextInput.focus();
        } else {
          const newSeq = [...newSequence, NaN];
          setSequence(newSeq);
          setTimeout(() => {
            const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
            if (nextInput) nextInput.focus();
          }, 50);
        }
      }, 10);
      
      return;
    }
    
    if (value === '' || value === '?') {
      newSequence[index] = NaN;
    } else {
      const num = parseFloat(value);
      newSequence[index] = isNaN(num) ? NaN : num;
    }
    
    setSequence(newSequence);
    setPredictionHistory({});
    setSigmaHistory([]);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      e.preventDefault();
      if (index > 0) {
        const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
        if (prevInput) {
          prevInput.focus();
          prevInput.select();
        }
      }
    } else if (e.key === 'ArrowLeft' && e.target.selectionStart === 0) {
      e.preventDefault();
      if (index > 0) {
        const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
        if (prevInput) {
          prevInput.focus();
          prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length);
        }
      }
    } else if (e.key === 'ArrowRight' && e.target.selectionStart === e.target.value.length) {
      e.preventDefault();
      if (index + 1 < sequence.length) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(0, 0);
        }
      } else {
        const newSeq = [...sequence, NaN];
        setSequence(newSeq);
        setTimeout(() => {
          const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
          if (nextInput) nextInput.focus();
        }, 50);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const newSeq = [...sequence, NaN];
      setSequence(newSeq);
      setTimeout(() => {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }, 50);
    }
  };

  const addBox = () => {
    setIsPlaceholder(false);
    setSequence([...sequence, NaN]);
    setPredictionHistory({});
    setSigmaHistory([]);
  };

  const removeBox = () => {
    if (sequence.length > 1) {
      setIsPlaceholder(false);
      setSequence(sequence.slice(0, -1));
      setPredictionHistory({});
      setSigmaHistory([]);
    }
  };

  const addPrediction = (boxIndex, value, sigma, error) => {
    setPredictionHistory(prev => {
      const currentHistory = prev[boxIndex] || [];
      const newPrediction = {
        value,
        sigma,
        error,
        timestamp: Date.now(),
        confidence: 1 / (1 + sigma * error)
      };
      
      const updatedHistory = [...currentHistory, newPrediction].slice(-3);
      
      return {
        ...prev,
        [boxIndex]: updatedHistory
      };
    });
  };

  const addSigmaData = (sigma, iteration, error) => {
    setSigmaHistory(prev => [...prev, { sigma, iteration, error }]);
  };

  const getPredictionColor = (confidence, opacity = 1) => {
    const red = Math.round(255 * (1 - confidence));
    const green = Math.round(255 * confidence);
    return `rgba(${red}, ${green}, 100, ${opacity})`;
  };

  const processSequence = async () => {
    setIsProcessing(true);
    setPredictionHistory({});
    setSigmaHistory([]);
    setError(null);

    const effectiveRank = Math.min(settings.rank, maxRank);

    const payload = {
      sequence: sequence.map(val => isNaN(val) ? null : val),
      settings: {
        tolerance: settings.tolerance,
        rank: effectiveRank,
        max_iters: settings.max_iters,
        mean_type: settings.mean_type
      }
    };

    console.log('Sending payload:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (!line.trim()) continue;
          
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.substring(6);
              const parsed = JSON.parse(jsonStr);
              
              if (parsed.type === 'prediction_update') {
                const updateData = parsed.data;
                
                // Add sigma data for chart
                addSigmaData(updateData.sigma, updateData.iteration, updateData.error);
                
                // Process predictions for boxes
                missingIndices.forEach((boxIndex, idx) => {
                  if (idx < updateData.elements_updated.length) {
                    const value = updateData.elements_updated[idx];
                    const sigma = updateData.sigma[idx] || 0.1;
                    const error = updateData.error || 0.05;
                    
                    addPrediction(boxIndex, value, sigma, error);
                  }
                });
              } else if (parsed.type === 'completion') {
                console.log('Prediction completed:', parsed.data);
              }
            } catch (parseError) {
              console.warn('Failed to parse line:', line, parseError);
            }
          }
        }
      }
      
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message);
      
      // Fallback to demo mode
      const totalRounds = 10;
      for (let round = 0; round < totalRounds; round++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const convergenceFactor = (round + 1) / totalRounds;
        
        // Generate demo sigma values
        const demoSigma = [
          7.7 + Math.random() * 0.05 - (1 - convergenceFactor) * 0.5,
          0.25 - convergenceFactor * 0.03 + Math.random() * 0.02,
          0.12 - convergenceFactor * 0.06 + Math.random() * 0.01
        ];
        
        const demoError = Math.max(0.001, 0.5 * (1 - convergenceFactor));
        
        addSigmaData(demoSigma, round, demoError);
        
        missingIndices.forEach((boxIndex) => {
          const baseValue = Math.sin(boxIndex) * 10;
          const noise = (1 - convergenceFactor) * (Math.random() - 0.5) * 5;
          
          const value = baseValue + noise;
          const sigma = Math.max(0.1, 2 * (1 - convergenceFactor) + Math.random() * 0.5);
          
          addPrediction(boxIndex, value, sigma, demoError);
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    if (sequence.length === 0 || missingIndices.length === 0) return;
    processSequence();
  };

  const renderSequenceBox = (value, index) => {
    const isMissing = isNaN(value);
    const predictions = predictionHistory[index] || [];
    const latestPrediction = predictions[predictions.length - 1];

    let displayValue = '';
    let inputValue = '';
    
    if (isMissing) {
      displayValue = '?';
      inputValue = '';
    } else {
      displayValue = value.toString();
      inputValue = value.toString();
    }

    const boxStyle = latestPrediction ? {
      backgroundColor: getPredictionColor(latestPrediction.confidence, 0.9),
      borderColor: getPredictionColor(latestPrediction.confidence, 1),
    } : {};

    return (
      <div key={index} className="sequence-box-container">
        <div 
          className={`sequence-box ${isPlaceholder ? 'placeholder' : ''} ${latestPrediction ? 'predicted' : ''}`}
          style={boxStyle}
        >
          {latestPrediction ? (
            <div className="predicted-value">
              {latestPrediction.value.toFixed(3)}
            </div>
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleBoxInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isProcessing}
              data-index={index}
              placeholder={isMissing ? '?' : ''}
              onFocus={() => setIsPlaceholder(false)}
              autoComplete="off"
              spellCheck={false}
            />
          )}
        </div>

        {predictions.length > 1 && (
          <div className="prediction-history">
            {predictions.slice(0, -1).reverse().map((pred, historyIdx) => {
              const opacity = (predictions.length - 1 - historyIdx) / predictions.length;
              const historyStyle = {
                backgroundColor: getPredictionColor(pred.confidence, opacity * 0.7)
              };
              return (
                <div
                  key={pred.timestamp}
                  className="prediction-item"
                  style={historyStyle}
                >
                  {pred.value.toFixed(3)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sequence-container">
      <div className="sequence-card">
        <h1 className="sequence-title">Sequence Completion Algorithm</h1>

        {error && (
          <div className="error-banner">
            <strong>API Connection Error:</strong> {error}
            <br />
            <small>Running in demo mode. Update API_URL in the code to connect to your backend.</small>
          </div>
        )}

        <div>
          <div className="sequence-header">
            <h3 className="sequence-subtitle">Sequence</h3>
            <div className="button-group">
              <button
                onClick={addBox}
                disabled={isProcessing}
                className="btn btn-add"
              >
                + Add
              </button>
              <button
                onClick={removeBox}
                disabled={isProcessing || sequence.length <= 1}
                className="btn btn-remove"
              >
                Remove
              </button>
              <button
                onClick={handleSubmit}
                disabled={isProcessing || missingIndices.length === 0}
                className="btn btn-predict"
              >
                {isProcessing ? 'Processing...' : 'Predict'}
              </button>
            </div>
          </div>
          
          <div className="sequence-grid">
            {sequence.map((value, index) => renderSequenceBox(value, index))}
          </div>

          <div className="sequence-info">
            {isPlaceholder && (
              <span className="placeholder-text">Sample sequence shown - click any box to edit • </span>
            )}
            {missingIndices.length} missing value(s) • {sequence.length} total elements
          </div>
        </div>

        {isProcessing && (
          <div className="processing-banner">
            <div className="spinner"></div>
            <div className="processing-text">
              <div className="processing-title">Processing sequence predictions...</div>
              <div className="processing-subtitle">
                Watch the boxes and chart update as new predictions arrive.
              </div>
            </div>
          </div>
        )}

        {sigmaHistory.length > 0 && (
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Singular Value Convergence</h3>
              <p className="chart-subtitle">
                Logarithmic scale showing how singular values evolve during iteration. 
                More recent iterations appear with higher opacity.
              </p>
            </div>
            <div className="chart-wrapper">
              <canvas ref={chartRef} id="sigma-chart"></canvas>
            </div>
          </div>
        )}

        {Object.keys(predictionHistory).length > 0 && (
          <div className="results-summary">
            <h3 className="results-title">Latest Predictions Summary</h3>
            <div className="results-grid">
              {Object.entries(predictionHistory).map(([boxIndex, predictions]) => {
                const latest = predictions[predictions.length - 1];
                return (
                  <div key={boxIndex} className="result-card">
                    <div className="result-value">
                      Position {boxIndex}: {latest.value.toFixed(4)}
                    </div>
                    <div className="result-details">
                      <div>Confidence: {(latest.confidence * 100).toFixed(1)}%</div>
                      <div>Sigma: {latest.sigma.toFixed(4)}</div>
                      <div>Error: {latest.error.toFixed(4)}</div>
                      <div>Updates: {predictions.length}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="settings-section">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`settings-toggle ${showSettings ? 'open' : ''}`}
          >
            <svg className="gear" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Algorithm Settings
            <svg className="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {showSettings && (
            <div className="settings-grid">
              <div className="settings-field">
                <label>Tolerance</label>
                <input
                  type="number"
                  value={settings.tolerance}
                  onChange={(e) => setSettings(prev => ({ ...prev, tolerance: parseFloat(e.target.value) || 1e-6 }))}
                  disabled={isProcessing}
                  step="1e-6"
                />
              </div>
              <div className="settings-field">
                <label>Rank (max: {maxRank})</label>
                <input
                  type="number"
                  value={settings.rank}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    rank: Math.min(Math.max(1, parseInt(e.target.value) || 1), maxRank)
                  }))}
                  disabled={isProcessing}
                  min="1"
                  max={maxRank}
                />
                <small className="rank-helper-text">
                  Based on {observedCount} observed values (n/2)
                </small>
              </div>
              <div className="settings-field">
                <label>Max Iterations</label>
                <input
                  type="number"
                  value={settings.max_iters}
                  onChange={(e) => setSettings(prev => ({ ...prev, max_iters: Math.max(0, Math.min(5000, parseInt(e.target.value) || 1000)) }))}
                  disabled={isProcessing}
                  min="0"
                  max="5000"
                />
              </div>
              <div className="settings-field">
                <label>Mean Type</label>
                <select
                  value={settings.mean_type}
                  onChange={(e) => setSettings(prev => ({ ...prev, mean_type: e.target.value }))}
                  disabled={isProcessing}
                >
                  <option value="geometric">Geometric</option>
                  <option value="harmonic">Harmonic</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<SequenceCompletionUI />, document.getElementById('sequence-app-root'));
</script>