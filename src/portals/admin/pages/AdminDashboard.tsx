import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DEPARTMENT_STATS } from '@/services/mock/departmentAnalytics.mock';
import { MOCK_COMPETENCIES } from '@/services/mock/competencies.mock';
import { StatCard } from '@/components/common/StatCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldCheck,
  Network,
  Users,
  Building2,
  ArrowRight,
  Database,
  Layers
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Admin Sovereign Banner */}
      <div className="rounded-2xl border bg-gradient-to-r from-navy-900 via-primary-950 to-primary-900 text-white p-6 md:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <Badge variant="emerald" className="text-[11px] font-bold tracking-wider uppercase">
            MoSPI Central Statistical Administration
          </Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold font-display tracking-tight text-white">
            System Administration & Governance
          </h2>
          <p className="text-sm text-slate-200">
            Managing the National Statistical Competency Framework across NSSO, CSO, NAD, and 36 State/UT DES.
          </p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="National Readiness Index"
          value={83.6}
          suffix="%"
          subtitle="System-Wide Statistical Capacity"
          icon={ShieldCheck}
          color="emerald"
        />

        <StatCard
          title="Active Competencies"
          value={MOCK_COMPETENCIES.length}
          subtitle="Official Core Domains"
          icon={Network}
          color="primary"
        />

        <StatCard
          title="Registered Officers"
          value={106}
          subtitle="ISS, SSS, and Statistical Staff"
          icon={Users}
          color="primary"
        />

        <StatCard
          title="Divisions Connected"
          value={MOCK_DEPARTMENT_STATS.length}
          subtitle="Real-time Telemetry Ingestion"
          icon={Building2}
          color="saffron"
        />
      </div>

      {/* Quick Governance Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase">
              <Layers className="h-4 w-4" />
              <span>Competency Standards Management</span>
            </div>
            <CardTitle className="text-lg">Competency Framework Editor</CardTitle>
            <CardDescription className="text-xs">
              Configure competency definitions, Level 1 to 5 criteria, and criticality multipliers across official statistical domains.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="default" size="sm">
              <Link to="/admin/framework" className="flex items-center space-x-1">
                <span>Manage Framework Taxonomy</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-2 text-saffron-600 font-bold text-xs uppercase">
              <Database className="h-4 w-4" />
              <span>Workforce Analytics Engine</span>
            </div>
            <CardTitle className="text-lg">Inter-Division Capacity Matrix</CardTitle>
            <CardDescription className="text-xs">
              Compare statistical readiness indices across NSSO Field Operations, Price Statistics, and National Accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="saffron" size="sm">
              <Link to="/admin/workforce" className="flex items-center space-x-1">
                <span>View National Workforce Matrix</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
