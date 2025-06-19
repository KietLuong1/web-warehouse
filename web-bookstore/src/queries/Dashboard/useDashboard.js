// hooks/useDashboard.ts
import { useCallback, useEffect, useState } from 'react';
import warehouseService from './services/warehouse.service';
export const useDashboard = (dateRange = null, refreshInterval = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            let result;
            if (dateRange && dateRange.length === 2) {
                result = await warehouseService.getDashboardSummaryByDateRange(dateRange[0], dateRange[1]);
            }
            else {
                result = await warehouseService.getDashboardSummary();
            }
            setData(result.data.dashboard);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error('Dashboard data loading failed:', err);
        }
        finally {
            setLoading(false);
        }
    }, [dateRange]);
    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);
    useEffect(() => {
        if (!refreshInterval)
            return;
        const interval = setInterval(loadDashboardData, refreshInterval);
        return () => clearInterval(interval);
    }, [loadDashboardData, refreshInterval]);
    return {
        data,
        loading,
        error,
        refresh: loadDashboardData
    };
};
export const useTransactionTrends = (period = 'DAILY') => {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadTrends = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await warehouseService.getTransactionTrends(period);
                setTrends(response.data.trends || []);
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load trends';
                setError(errorMessage);
                console.error('Failed to load trends:', err);
            }
            finally {
                setLoading(false);
            }
        };
        loadTrends();
    }, [period]);
    return { trends, loading, error };
};
export const useLowStockAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadAlerts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await warehouseService.getLowStockAlerts();
                setAlerts(response.data.alerts || []);
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load alerts';
                setError(errorMessage);
                console.error('Failed to load alerts:', err);
            }
            finally {
                setLoading(false);
            }
        };
        loadAlerts();
    }, []);
    return { alerts, loading, error };
};
