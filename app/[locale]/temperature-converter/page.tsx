'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Minus, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ToolLayout } from '@/components/layout/tool-layout';
import {
  convertCelsiusToKelvin,
  convertDelisleToKelvin,
  convertFahrenheitToKelvin,
  convertKelvinToCelsius,
  convertKelvinToDelisle,
  convertKelvinToFahrenheit,
  convertKelvinToNewton,
  convertKelvinToRankine,
  convertKelvinToReaumur,
  convertKelvinToRomer,
  convertNewtonToKelvin,
  convertRankineToKelvin,
  convertReaumurToKelvin,
  convertRomerToKelvin,
} from '@/lib/temperature-converter.models';

type TemperatureScale =
  | 'kelvin'
  | 'celsius'
  | 'fahrenheit'
  | 'rankine'
  | 'delisle'
  | 'newton'
  | 'reaumur'
  | 'romer';

interface TemperatureUnit {
  titleKey: string;
  unit: string;
  value: number;
  displayValue: string;
  toKelvin: (v: number) => number;
  fromKelvin: (v: number) => number;
}

const createUnits = (): Record<TemperatureScale, TemperatureUnit> => ({
  kelvin: {
    titleKey: 'kelvin',
    unit: 'K',
    value: 0,
    displayValue: '0',
    toKelvin: (v: number) => v,
    fromKelvin: (v: number) => v,
  },
  celsius: {
    titleKey: 'celsius',
    unit: '°C',
    value: -273.15,
    displayValue: '-273.15',
    toKelvin: convertCelsiusToKelvin,
    fromKelvin: convertKelvinToCelsius,
  },
  fahrenheit: {
    titleKey: 'fahrenheit',
    unit: '°F',
    value: -459.67,
    displayValue: '-459.67',
    toKelvin: convertFahrenheitToKelvin,
    fromKelvin: convertKelvinToFahrenheit,
  },
  rankine: {
    titleKey: 'rankine',
    unit: '°R',
    value: 0,
    displayValue: '0',
    toKelvin: convertRankineToKelvin,
    fromKelvin: convertKelvinToRankine,
  },
  delisle: {
    titleKey: 'delisle',
    unit: '°De',
    value: 559.725,
    displayValue: '559.72',
    toKelvin: convertDelisleToKelvin,
    fromKelvin: convertKelvinToDelisle,
  },
  newton: {
    titleKey: 'newton',
    unit: '°N',
    value: -90.14,
    displayValue: '-90.14',
    toKelvin: convertNewtonToKelvin,
    fromKelvin: convertKelvinToNewton,
  },
  reaumur: {
    titleKey: 'reaumur',
    unit: '°Ré',
    value: -218.52,
    displayValue: '-218.52',
    toKelvin: convertReaumurToKelvin,
    fromKelvin: convertKelvinToReaumur,
  },
  romer: {
    titleKey: 'romer',
    unit: '°Rø',
    value: -135.90375,
    displayValue: '-135.91',
    toKelvin: convertRomerToKelvin,
    fromKelvin: convertKelvinToRomer,
  },
});

export default function TemperatureConverterPage() {
  const t = useTranslations('measurement.temperatureConverter');
  const [units, setUnits] = useState(createUnits());

  const updateTemperatures = useCallback(
    (changedScale: TemperatureScale, newValue: number, displayValue: string) => {
      const changedUnit = units[changedScale];
      const kelvins = changedUnit.toKelvin(newValue);

      setUnits((prevUnits) => {
        const newUnits = { ...prevUnits };

        // Update the changed unit
        newUnits[changedScale] = {
          ...newUnits[changedScale],
          value: newValue,
          displayValue: displayValue,
        };

        // Update all other units based on Kelvin conversion
        (Object.keys(newUnits) as TemperatureScale[]).forEach((scale) => {
          if (scale !== changedScale) {
            const convertedValue = newUnits[scale].fromKelvin(kelvins);
            const roundedValue = Math.round(convertedValue * 100) / 100;
            newUnits[scale] = {
              ...newUnits[scale],
              value: roundedValue,
              displayValue: roundedValue.toString(),
            };
          }
        });

        return newUnits;
      });
    },
    [units]
  );

  const handleInputChange = (scale: TemperatureScale, value: string) => {
    // 立即更新显示值以保持用户输入
    setUnits((prev) => ({
      ...prev,
      [scale]: { ...prev[scale], displayValue: value },
    }));

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateTemperatures(scale, numValue, value);
    }
  };

  const adjustValue = (scale: TemperatureScale, delta: number) => {
    const currentValue = units[scale].value;
    const newValue = currentValue + delta;
    const newDisplayValue = newValue.toString();
    updateTemperatures(scale, newValue, newDisplayValue);
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-4 max-w-2xl mx-auto">
        {(Object.entries(units) as [TemperatureScale, TemperatureUnit][]).map(([scale, unit]) => (
          <div key={scale} className="flex items-center gap-2">
            <Label className="w-24 text-sm font-medium">{t(`scales.${unit.titleKey}`)}</Label>

            <div className="flex items-center flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustValue(scale, -1)}
                className="h-10 w-10 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                type="text"
                value={unit.displayValue}
                onChange={(e) => handleInputChange(scale, e.target.value)}
                className="flex-1 mx-2 text-center"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustValue(scale, 1)}
                className="h-10 w-10 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Label className="w-12 text-sm text-muted-foreground text-right">{unit.unit}</Label>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
