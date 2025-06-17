import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SpecsTable from '@/components/SpecsTable'; // Custom component for displaying specifications
import { Cpu, HardDrive, MemoryStick, Monitor, Power, Maximize, Network, Wifi, Usb, Zap, Speaker, Camera, Keyboard, MousePointer, Ruler, Laptop } from 'lucide-react'; // Icons for specs

// Sample data for the SpecsTable component
const sampleSpecs = [
  // Processor & Memory
  { id: 'cpu_model', category: 'Processor & Memory', name: 'Processor', value: 'NextGen Fusion Core X1 (10-core CPU)', icon: <Cpu className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'cpu_speed', category: 'Processor & Memory', name: 'Clock Speed', value: 'Up to 4.8 GHz Turbo Boost' },
  { id: 'ram_type', category: 'Processor & Memory', name: 'Memory (RAM)', value: '16GB Unified LPDDR5X RAM', icon: <MemoryStick className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'ram_configurable', category: 'Processor & Memory', name: 'Configurable to', value: '32GB or 64GB' },

  // Storage
  { id: 'ssd_capacity', category: 'Storage', name: 'Solid State Drive (SSD)', value: '512GB PCIe NVMe SSD', icon: <HardDrive className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'ssd_configurable', category: 'Storage', name: 'Configurable to', value: '1TB, 2TB, or 4TB SSD' },

  // Display
  { id: 'display_size', category: 'Display', name: 'Screen Size', value: '14.2-inch (diagonal) Liquid Retina XDR display', icon: <Monitor className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'display_resolution', category: 'Display', name: 'Resolution', value: '3024 x 1964 native resolution at 254 pixels per inch' },
  { id: 'display_brightness', category: 'Display', name: 'Brightness', value: '1000 nits sustained (full-screen) brightness, 1600 nits peak brightness' },
  { id: 'display_features', category: 'Display', name: 'Features', value: 'ProMotion technology for adaptive refresh rates up to 120Hz, Wide color (P3), True Tone technology' },

  // Graphics
  { id: 'gpu_model', category: 'Graphics', name: 'Graphics Processor', value: 'Integrated 16-core GPU', icon: <Maximize className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'gpu_configurable', category: 'Graphics', name: 'Configurable to', value: 'Integrated 32-core GPU' },

  // Ports & Connectivity
  { id: 'ports_thunderbolt', category: 'Ports & Connectivity', name: 'Thunderbolt 4 (USB-C)', value: 'Three ports with support for: Charging, DisplayPort, Thunderbolt 4 (up to 40Gb/s), USB 4 (up to 40Gb/s)', icon: <Usb className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'ports_hdmi', category: 'Ports & Connectivity', name: 'HDMI Port', value: '1x HDMI 2.1 port' },
  { id: 'ports_sdxc', category: 'Ports & Connectivity', name: 'SD Card Slot', value: 'SDXC card slot' },
  { id: 'ports_headphone', category: 'Ports & Connectivity', name: 'Headphone Jack', value: '3.5 mm headphone jack with advanced support for high-impedance headphones' },
  { id: 'wireless_wifi', category: 'Ports & Connectivity', name: 'Wi-Fi', value: 'Wi-Fi 6E (802.11ax)', icon: <Wifi className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'wireless_bluetooth', category: 'Ports & Connectivity', name: 'Bluetooth', value: 'Bluetooth 5.3 wireless technology' },

  // Audio
  { id: 'audio_speakers', category: 'Audio', name: 'Speakers', value: 'High-fidelity six-speaker sound system with force-cancelling woofers', icon: <Speaker className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'audio_mics', category: 'Audio', name: 'Microphones', value: 'Studio-quality three-mic array with high signal-to-noise ratio and directional beamforming' },

  // Camera
  { id: 'camera_facetime', category: 'Camera', name: 'Camera', value: '1080p FaceTime HD camera with advanced image signal processor', icon: <Camera className="inline-block mr-2 h-5 w-5 text-primary" /> },

  // Keyboard & Trackpad
  { id: 'keyboard', category: 'Keyboard & Trackpad', name: 'Keyboard', value: 'Backlit Magic Keyboard with Touch ID, Ambient light sensor', icon: <Keyboard className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'trackpad', category: 'Keyboard & Trackpad', name: 'Trackpad', value: 'Force Touch trackpad for precise cursor control and pressure-sensing capabilities', icon: <MousePointer className="inline-block mr-2 h-5 w-5 text-primary" /> },
  
  // Dimensions & Weight
  { id: 'dimensions_height', category: 'Dimensions & Weight', name: 'Height', value: '0.61 inch (1.55 cm)', icon: <Ruler className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'dimensions_width', category: 'Dimensions & Weight', name: 'Width', value: '12.31 inches (31.26 cm)' },
  { id: 'dimensions_depth', category: 'Dimensions & Weight', name: 'Depth', value: '8.71 inches (22.12 cm)' },
  { id: 'dimensions_weight', category: 'Dimensions & Weight', name: 'Weight', value: '3.5 pounds (1.6 kg)' },

  // Battery & Power
  { id: 'battery_type', category: 'Battery & Power', name: 'Battery', value: '70-watt-hour lithium-polymer battery', icon: <Power className="inline-block mr-2 h-5 w-5 text-primary" /> },
  { id: 'battery_life', category: 'Battery & Power', name: 'Battery Life', value: 'Up to 18 hours video playback, Up to 12 hours wireless web' },
  { id: 'power_adapter', category: 'Battery & Power', name: 'Power Adapter', value: '67W USB-C Power Adapter (included with M1 Pro with 8-core CPU), 96W USB-C Power Adapter (included with M1 Pro with 10-core CPU or M1 Max, configurable with M1 Pro with 8-core CPU)' },

  // Operating System
  { id: 'os', category: 'Operating System', name: 'Operating System', value: 'Pre-installed with latest compatible macOS (or specified OS)', icon: <Laptop className="inline-block mr-2 h-5 w-5 text-primary" /> },
];

const SpecificationsPage: React.FC = () => {
  console.log('SpecificationsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16"> {/* Adjusted padding for fixed header */}
        <div className="max-w-5xl mx-auto">
          <section id="technical-specifications" aria-labelledby="specifications-heading" className="my-8">
            <SpecsTable
              title="Technical Specifications"
              specs={sampleSpecs.map(spec => ({
                ...spec,
                // Wrap name with icon if icon exists
                name: spec.icon ? <>{spec.icon}{spec.name}</> : spec.name,
              }))}
              caption="Product specifications are subject to change without notice. Weight varies by configuration and manufacturing process."
            />
          </section>

          <section aria-labelledby="notes-heading" className="my-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 id="notes-heading" className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Important Notes
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li>Battery life varies by use and configuration. See vendor website for more information.</li>
              <li>Storage capacity is subject to change based on software version and system files. 1GB = 1 billion bytes; 1TB = 1 trillion bytes; actual formatted capacity less.</li>
              <li>Display size is measured diagonally.</li>
              <li>Availability of features, applications, and services may vary by region.</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecificationsPage;