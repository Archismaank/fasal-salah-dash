import { useState } from 'react';
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
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [location, setLocation] = useState('');
  const [fieldArea, setFieldArea] = useState('');
  const [unit, setUnit] = useState('acres');
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleLocationUse = () => {
    setLocation('Amreli, Gujarat');
    // Simulate getting location
  };

  const handleAnalyze = () => {
    if (location && fieldArea) {
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
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Fasal Salah</h1>
                <p className="text-sm text-muted-foreground">Welcome, Farmer!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <Badge variant="secondary">2 alerts</Badge>
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
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="field" onClick={handleLocationUse}>
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Field Area */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Field Area</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter area"
                    value={fieldArea}
                    onChange={(e) => setFieldArea(e.target.value)}
                    className="flex-1"
                  />
                  <select 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)}
                    className="px-3 py-2 border border-input bg-background rounded-md"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>

              {/* Soil Health Card */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Soil Health Card</label>
                <Button variant="earth" className="w-full justify-start">
                  <Upload className="w-4 h-4" />
                  Upload PDF
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={!location || !fieldArea || isAnalyzing}
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
                  {/* Simulated satellite map */}
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

              {/* Alerts */}
              <Card className="shadow-card border-warning/30">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bell className="w-5 h-5 text-warning" />
                    Important Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">New Analysis Complete</p>
                        <p className="text-xs text-muted-foreground">Satellite image from Sept 4th analyzed</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
                      <Bell className="w-5 h-5 text-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Fertilizer Reminder</p>
                        <p className="text-xs text-muted-foreground">Application due this Friday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;