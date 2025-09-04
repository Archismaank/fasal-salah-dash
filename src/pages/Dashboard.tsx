import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MapPin, 
  Upload, 
  Leaf, 
  Droplets, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Bell,
  LogOut,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MapSelector } from '@/components/MapSelector';

// Conversion factors from Square Meters to other units
const conversionFactors: { [key: string]: number } = {
  sq_m: 1,
  sq_ft: 10.7639,
  acres: 0.000247105,
  hectares: 0.0001,
  bigha: 0.000074752, // Note: This varies by region
  katha: 0.00149505,  // Note: This varies by region
};

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState('');
  const [fieldAreaInSqM, setFieldAreaInSqM] = useState(0);
  const [displayedArea, setDisplayedArea] = useState('0.00');
  const [unit, setUnit] = useState('acres');
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showMapSelector, setShowMapSelector] = useState(false);

  // Re-calculate and update the displayed area whenever the base area or the unit changes
  useEffect(() => {
    if (fieldAreaInSqM > 0) {
      const convertedValue = fieldAreaInSqM * conversionFactors[unit];
      setDisplayedArea(convertedValue.toFixed(2));
    } else {
      setDisplayedArea('0.00');
    }
  }, [fieldAreaInSqM, unit]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Receive location, coordinates, AND the calculated area from the map component
  const handleMapLocationSelect = (selectedLocation: string, coordinates?: [number, number][], areaInSqMeters?: number) => {
    setLocation(selectedLocation);
    if (areaInSqMeters) {
      setFieldAreaInSqM(areaInSqMeters);
    }
  };

  const handleAnalyze = () => {
    if (location && fieldAreaInSqM > 0) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setHasAnalysis(true);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Fasal Salah</h1>
                <p className="text-sm text-muted-foreground">Welcome, Farmer!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Badge variant="secondary">2 alerts</Badge>
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Input Section */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Let's Check Your Farm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Location Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Farm Location</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Click map to select location & mark area"
                    value={location}
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={() => setShowMapSelector(true)}>
                    <MapPin className="w-4 h-4" />
                    Map
                  </Button>
                </div>
              </div>

              {/* Field Area (Calculated) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Calculated Field Area</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2 border border-input bg-muted rounded-md text-foreground">
                    {displayedArea}
                  </div>
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}
                    className="px-3 py-2 border border-input bg-background rounded-md text-foreground"
                  >
                    <option value="sq_m">Sq Meter</option>
                    <option value="sq_ft">Sq Ft</option>
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                    <option value="bigha">Bigha</option>
                    <option value="katha">Katha</option>
                  </select>
                </div>
              </div>

              {/* Soil Health Card */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Soil Health Card</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button 
                  variant={uploadedFile ? "harvest" : "earth"} 
                  className="w-full justify-start" 
                  onClick={handleFileUpload}
                >
                  {uploadedFile ? <FileText className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                  {uploadedFile ? uploadedFile.name : 'Upload PDF'}
                </Button>
                {uploadedFile && (
                  <p className="text-xs text-success">✅ File uploaded successfully</p>
                )}
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!location || fieldAreaInSqM === 0 || isAnalyzing}
              variant="farm"
              size="lg"
              className="w-full md:w-auto"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Analyzing Your Farm...
                </>
              ) : (
                <>
                  <Leaf className="w-5 h-5" />
                  Analyze My Farm
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {hasAnalysis && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Field Analysis Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-field rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-success/20 via-success/30 to-warning/20 rounded-lg"></div>
                    <div className="absolute top-1/4 left-1/3 w-16 h-12 bg-warning/40 rounded-full"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-12 h-16 bg-warning/30 rounded-full"></div>
                  </div>
                  <div className="relative z-10 text-center bg-card/90 backdrop-blur-sm rounded-lg p-4 m-4">
                    <p className="text-sm text-muted-foreground mb-2">Interactive map showing</p>
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span>Healthy zones</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-warning rounded-full"></div>
                        <span>Needs attention</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Cards */}
            <div className="space-y-6">
              {/* Crop Stage Card */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Leaf className="w-5 h-5 text-success" />
                    Crop Growth Stage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-foreground mb-1">Flowering Stage</div>
                    <p className="text-sm text-muted-foreground">Tuber development in progress</p>
                  </div>
                  <Progress value={60} className="mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Planting</span>
                    <span className="font-semibold text-primary">Flowering</span>
                    <span>Harvest</span>
                  </div>
                </CardContent>
              </Card>

              {/* Soil Health Card */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Soil Health Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nitrogen (N)</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">Low</Badge>
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phosphorus (P)</span>
                      <div className="flex items-center gap-2">
                        <Badge className="text-xs bg-success">Optimal</Badge>
                        <CheckCircle className="w-4 h-4 text-success" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Potassium (K)</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">Low</Badge>
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 p-3 bg-muted rounded-lg">
                    Your soil needs more Nitrogen and Potassium for optimal potato growth.
                  </p>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    💡 This Week's Advice
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-field rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4" />
                      Fertilizer
                    </h4>
                    <p className="text-sm text-foreground mb-3">
                      Apply 15 kg of Urea per acre, focusing on the yellow zones shown on your map.
                    </p>
                    <Button variant="harvest" size="sm">
                      <CheckCircle className="w-4 h-4" />
                      Mark as Done
                    </Button>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Droplets className="w-4 h-4" />
                      Irrigation
                    </h4>
                    <p className="text-sm text-foreground mb-3">
                      Water your field for 2 hours every 3 days. Increase if no rainfall.
                    </p>
                    <Button variant="earth" size="sm">
                      <Calendar className="w-4 h-4" />
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        )}

        {/* Map Selector Modal */}
        <MapSelector
          isOpen={showMapSelector}
          onClose={() => setShowMapSelector(false)}
          onLocationSelect={handleMapLocationSelect}
          currentLocation={location}
        />
      </div>
    </div>
  );
};

export default Dashboard;

