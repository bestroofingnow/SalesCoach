import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Building, Save, Plus, X, Upload, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/navbar";

interface Company {
  id: string;
  name: string;
  industry?: string;
  location?: string;
  description?: string;
  logo?: string;
  services?: string[];
  values?: string[];
  trainingAreas?: string[];
  subscriptionStatus?: string;
  userCount?: number;
}

export default function CompanySettings() {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState<Company | null>(null);
  const [newService, setNewService] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newTrainingArea, setNewTrainingArea] = useState("");

  // Fetch company data
  const { data: company, isLoading, error } = useQuery<Company>({
    queryKey: ['/api/company'],
    queryFn: async () => {
      const response = await fetch('/api/company', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch company');
      return response.json();
    }
  });

  useEffect(() => {
    if (company) {
      setCompanyData(company);
    }
  }, [company]);

  // Update company mutation
  const updateCompanyMutation = useMutation({
    mutationFn: async (data: Partial<Company>) => {
      return apiRequest('PUT', '/api/company', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/company'] });
      toast({
        title: "Settings saved",
        description: "Company settings have been updated successfully."
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update company settings. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSave = () => {
    if (companyData) {
      updateCompanyMutation.mutate(companyData);
    }
  };

  const handleInputChange = (field: keyof Company, value: any) => {
    if (companyData) {
      setCompanyData({
        ...companyData,
        [field]: value
      });
    }
  };

  const addItem = (field: 'services' | 'values' | 'trainingAreas', value: string) => {
    if (value.trim() && companyData) {
      const currentArray = (companyData[field] as string[]) || [];
      handleInputChange(field, [...currentArray, value.trim()]);
      
      // Clear the input
      if (field === 'services') setNewService("");
      if (field === 'values') setNewValue("");
      if (field === 'trainingAreas') setNewTrainingArea("");
    }
  };

  const removeItem = (field: 'services' | 'values' | 'trainingAreas', index: number) => {
    if (companyData) {
      const currentArray = (companyData[field] as string[]) || [];
      const newArray = currentArray.filter((_, i) => i !== index);
      handleInputChange(field, newArray);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !companyData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load company settings. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building className="h-8 w-8" />
              Company Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Customize your company profile and training settings
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            {companyData.subscriptionStatus || 'Active'} • {companyData.userCount || 0} Users
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Your company's basic details and description
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={companyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your Company Name"
                    data-testid="input-company-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={companyData.industry || ''}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    placeholder="Roofing Services"
                    data-testid="input-industry"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={companyData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  data-testid="input-location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  value={companyData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of your company..."
                  rows={4}
                  data-testid="input-description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Services Offered */}
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>
                List the services your company provides
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Add a service..."
                  onKeyPress={(e) => e.key === 'Enter' && addItem('services', newService)}
                  data-testid="input-new-service"
                />
                <Button
                  onClick={() => addItem('services', newService)}
                  size="sm"
                  data-testid="button-add-service"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(companyData.services || []).map((service, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {service}
                    <button
                      onClick={() => removeItem('services', index)}
                      className="ml-2 hover:text-destructive"
                      data-testid={`button-remove-service-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Values */}
          <Card>
            <CardHeader>
              <CardTitle>Company Values</CardTitle>
              <CardDescription>
                Core values that define your company culture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Add a value..."
                  onKeyPress={(e) => e.key === 'Enter' && addItem('values', newValue)}
                  data-testid="input-new-value"
                />
                <Button
                  onClick={() => addItem('values', newValue)}
                  size="sm"
                  data-testid="button-add-value"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(companyData.values || []).map((value, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {value}
                    <button
                      onClick={() => removeItem('values', index)}
                      className="ml-2 hover:text-destructive"
                      data-testid={`button-remove-value-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Training Focus Areas</CardTitle>
              <CardDescription>
                Key areas of focus for your training programs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTrainingArea}
                  onChange={(e) => setNewTrainingArea(e.target.value)}
                  placeholder="Add a training area..."
                  onKeyPress={(e) => e.key === 'Enter' && addItem('trainingAreas', newTrainingArea)}
                  data-testid="input-new-training-area"
                />
                <Button
                  onClick={() => addItem('trainingAreas', newTrainingArea)}
                  size="sm"
                  data-testid="button-add-training-area"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(companyData.trainingAreas || []).map((area, index) => (
                  <Badge key={index} className="px-3 py-1">
                    {area}
                    <button
                      onClick={() => removeItem('trainingAreas', index)}
                      className="ml-2 hover:text-destructive"
                      data-testid={`button-remove-training-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
              <CardDescription>
                Upload your company logo for branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {companyData.logo ? (
                  <img
                    src={companyData.logo}
                    alt="Company Logo"
                    className="h-20 w-20 object-contain border rounded"
                  />
                ) : (
                  <div className="h-20 w-20 border-2 border-dashed rounded flex items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: 200x200px, PNG or JPG
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setCompanyData(company!)}
              disabled={updateCompanyMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={updateCompanyMutation.isPending}
              data-testid="button-save-settings"
            >
              <Save className="h-4 w-4 mr-2" />
              {updateCompanyMutation.isPending ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}