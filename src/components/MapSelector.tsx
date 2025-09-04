import { useState } from 'react'
import { MapPin, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface MapSelectorProps {
  isOpen: boolean
  onClose: () => void
  onLocationSelect: (location: string, coordinates?: [number, number]) => void
  currentLocation?: string
}

export const MapSelector = ({ isOpen, onClose, onLocationSelect, currentLocation }: MapSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation || '')
  const [isMarking, setIsMarking] = useState(false)

  if (!isOpen) return null

  const handleLocationConfirm = () => {
    onLocationSelect(selectedLocation)
    onClose()
  }

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setSelectedLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
        },
        (error) => {
          console.error('Error getting location:', error)
          setSelectedLocation('Location access denied')
        }
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Select Farm Location
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Map Area */}
          <div className="aspect-video bg-gradient-field rounded-lg border border-border relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-success/20 via-success/30 to-warning/20">
              {/* Simulated map interface */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Interactive map will load here</p>
                  <p className="text-xs text-muted-foreground">Click to mark your field boundaries</p>
                </div>
              </div>
              
              {/* Field marking overlay */}
              {isMarking && (
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <p className="text-sm font-medium text-foreground">Field Marking Mode</p>
                  <p className="text-xs text-muted-foreground">Click to draw field boundaries</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="field" onClick={handleUseCurrentLocation}>
                <MapPin className="w-4 h-4" />
                Use GPS Location
              </Button>
              <Button 
                variant={isMarking ? "harvest" : "earth"} 
                onClick={() => setIsMarking(!isMarking)}
              >
                {isMarking ? "Stop Marking" : "Mark Field Area"}
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Location Coordinates / Address
              </label>
              <Input
                placeholder="Enter location or coordinates"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                variant="farm" 
                onClick={handleLocationConfirm} 
                disabled={!selectedLocation}
                className="flex-1"
              >
                <Check className="w-4 h-4" />
                Confirm Location
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}