
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type CategoryData = {
  name: string;
  value: number;
  color: string;
};

const TicketsByCategory = () => {
  // Sample data for ticket categories
  const data: CategoryData[] = [
    { name: 'Falta de Água', value: 35, color: '#0284c7' },
    { name: 'Problemas no Contador', value: 25, color: '#0ea5e9' },
    { name: 'Qualidade da Água', value: 20, color: '#38bdf8' },
    { name: 'Vazamento Visível', value: 15, color: '#7dd3fc' },
    { name: 'Baixa Pressão', value: 5, color: '#bae6fd' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-sm">{`${payload[0].value} chamados (${payload[0].payload.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate percentages
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Chamados por Categoria</CardTitle>
        <CardDescription>
          Distribuição de chamados por tipo de problema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                labelLine={false}
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{ paddingLeft: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketsByCategory;
