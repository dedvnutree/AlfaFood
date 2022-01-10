using System.Data;
using System.Data.Common;

namespace AlfaFoodBack
{
    public interface IDbConnections
    {
        public DbConnection GetConn();
    }
}