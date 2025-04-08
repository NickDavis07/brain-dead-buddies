import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_CHECKLIST } from '../utils/queries';
import Auth from '../utils/auth';
import zombieIcon from '../assets/scared_brain.png';
import { useEffect, useState } from 'react';
import SurvivalLifeBar from '../components/SurvivalLifeBar';

const Profile = () => {
  const { username: userParam } = useParams();
  const [completedItems, setCompletedItems] = useState(0);
  const [highPriorityCompleted, setHighPriorityCompleted] = useState(0);
  const [mediumPriorityCompleted, setMediumPriorityCompleted] = useState(0);
  const [lowPriorityCompleted, setLowPriorityCompleted] = useState(0);

  // Fetch user data
  const { loading: userLoading, data: userData } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
    fetchPolicy: 'network-only'
  });

  // Fetch checklist data to count completed items
  const { loading: checklistLoading, data: checklistData } = useQuery(QUERY_CHECKLIST, {
    fetchPolicy: 'network-only',
    skip: !Auth.loggedIn() // Skip query if not logged in
  });

  const user = userData?.me || userData?.user || {};
  
  // Calculate completed items whenever the checklist data changes
  useEffect(() => {
    if (checklistData?.checklist) {
      console.log("Checklist data:", checklistData.checklist);

      // Count total completed items
      const completed = checklistData.checklist.filter((item: any) => item.completed === true).length;
      
      // Count completed items by priority
      const highPriority = checklistData.checklist.filter((item: any) => 
        item.completed === true && item.priority === 'High'
      ).length;
      
      const mediumPriority = checklistData.checklist.filter((item: any) => 
        item.completed === true && item.priority === 'Medium'
      ).length;
      
      const lowPriority = checklistData.checklist.filter((item: any) => 
        item.completed === true && item.priority === 'Low'
      ).length;
      
      console.log("Completed items count:", completed);
      console.log("High priority completed:", highPriority);
      console.log("Medium priority completed:", mediumPriority);
      console.log("Low priority completed:", lowPriority);
      
      setCompletedItems(completed);
      setHighPriorityCompleted(highPriority);
      setMediumPriorityCompleted(mediumPriority);
      setLowPriorityCompleted(lowPriority);
    }
  }, [checklistData]);

  // Debug log to check what's coming back from server
  useEffect(() => {
    if (user) {
      console.log("User data:", user);
      console.log("Date joined:", user.dateJoined);
    }
  }, [user]);
  
  const calculateHealthPercentage = () => {
    // Base health starts at 50%
    let health = 50;
    
    // Add health based on completed checklist items by priority
    const highPriorityBonus = highPriorityCompleted * 10;  // 10% per high priority task
    const mediumPriorityBonus = mediumPriorityCompleted * 8;  // 8% per medium priority task
    const lowPriorityBonus = lowPriorityCompleted * 4;  // 4% per low priority task
    
    // Add bonuses to health
    health += highPriorityBonus + mediumPriorityBonus + lowPriorityBonus;
    
    // Add health based on days survived (max 10% bonus)
    const daysSurvived = calculateDaysSurvived();
    const daysBonus = Math.min(10, daysSurvived);
    health += daysBonus;
    
    // Cap health at 100%
    return Math.min(100, health);
  };
  
  // Calculate days survived (days since joining)
  const calculateDaysSurvived = () => {
    if (!user.dateJoined) return 0;
    
    try {
      // Handle different possible date formats
      const joinDate = new Date(user.dateJoined);
      
      // Check if date is valid
      if (isNaN(joinDate.getTime())) {
        console.log("Invalid date format:", user.dateJoined);
        return 0;
      }
      
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - joinDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      console.error("Error calculating days survived:", error);
      return 0;
    }
  };
  
  // Calculate survival level based on completed checklist items
  const calculateSurvivalLevel = () => {
    if (completedItems >= 25) return "Zombie Whisperer";
    if (completedItems >= 20) return "Apocalypse Legend";
    if (completedItems >= 15) return "Wasteland Warlord";
    if (completedItems >= 12) return "Apocalypse Expert";
    if (completedItems >= 10) return "Brain Harvester";
    if (completedItems >= 8) return "Zombie Slayer";
    if (completedItems >= 6) return "Seasoned Survivor"; 
    if (completedItems >= 4) return "Scavenger";
    if (completedItems >= 2) return "Survival Rookie";
    if (completedItems >= 1) return "Walker Bait";
    return "Fresh Meat";
  };
  
  // Format the join date with a default date if none exists
  const formatJoinDate = () => {
    // If we don't have dateJoined, use a default date with zombie theme
    if (!user.dateJoined) {
      return "First Day of the Outbreak";
    }
    
    try {
      const joinDate = new Date(user.dateJoined);
      
      // Check if date is valid
      if (isNaN(joinDate.getTime())) {
        return "First Day of the Outbreak";
      }
      
      // Format date as Month Day, Year
      return joinDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "First Day of the Outbreak";
    }
  };

  if (userLoading || checklistLoading) {
    return <div className="loading-container">
      <div className="text-light">Loading survivor data...</div>
    </div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4 className="text-light p-3">
        You need to be logged in to see this profile. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="container my-5">
      <div 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '15px',
          border: '2px solid #3d9a40',
          padding: '30px',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 0 20px rgba(61, 154, 64, 0.3)'
        }}
      >
        {/* Profile Header */}
        <div className="text-center mb-4">
          <h2 className="text-light">
            {userParam ? `${user.username}'s Survivor Profile` : 'Your Survivor Profile'}
          </h2>
        </div>
        
        <div className="row">
          {/* Profile Image and Basic Info */}
          <div className="col-md-4 text-center mb-4">
            <div 
              style={{ 
                position: 'relative',
                width: '150px',
                height: '150px',
                margin: '0 auto',
                marginBottom: '15px'
              }}
            >
              <img 
                src={zombieIcon} 
                alt="Survivor" 
                style={{ 
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '3px solid #3d9a40',
                  padding: '5px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
              />
              <div 
                style={{ 
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px rgba(61, 154, 64, 0.7)',
                  pointerEvents: 'none'
                }}
              ></div>
            </div>
            
            <h3 className="text-light mb-2">{user.username}</h3>
            
            <div 
              style={{ 
                display: 'inline-block',
                backgroundColor: '#222',
                color: '#3d9a40',
                padding: '5px 15px',
                borderRadius: '20px',
                fontWeight: 'bold',
                border: '1px solid #3d9a40'
              }}
            >
              {calculateSurvivalLevel()}
            </div>
            <SurvivalLifeBar 
              healthPercentage={calculateHealthPercentage()} 
              label="Survivor Health" 
            />
          </div>
          
          {/* Survivor Stats */}
          <div className="col-md-8">
            <div 
              style={{ 
                backgroundColor: 'rgba(20, 20, 20, 0.7)',
                borderRadius: '10px',
                padding: '20px',
                height: '100%',
                border: '1px solid #444'
              }}
            >
              <h3 
                style={{ 
                  color: '#ff5555',
                  borderBottom: '1px solid #444',
                  paddingBottom: '10px',
                  marginBottom: '20px'
                }}
              >
                Survivor Statistics
              </h3>
              
              <div className="row text-center">
                {/* Days Survived */}
                <div className="col-md-4 mb-3">
                  <div 
                    style={{ 
                      backgroundColor: 'rgba(40, 40, 40, 0.7)',
                      borderRadius: '10px',
                      padding: '15px',
                      height: '100%'
                    }}
                  >
                    <h1 
                      style={{ 
                        color: '#3d9a40',
                        fontSize: '2.5rem',
                        marginBottom: '5px'
                      }}
                    >
                      {calculateDaysSurvived()}
                    </h1>
                    <p className="text-light m-0">Days Survived</p>
                  </div>
                </div>
                
                {/* Completed Checklist Items */}
                <div className="col-md-4 mb-3">
                  <div 
                    style={{ 
                      backgroundColor: 'rgba(40, 40, 40, 0.7)',
                      borderRadius: '10px',
                      padding: '15px',
                      height: '100%'
                    }}
                  >
                    <h1 
                      style={{ 
                        color: '#ff5555',
                        fontSize: '2.5rem',
                        marginBottom: '5px'
                      }}
                    >
                      {completedItems}
                    </h1>
                    <p className="text-light m-0">Tasks Completed</p>
                  </div>
                </div>
                
                {/* Role */}
                <div className="col-md-4 mb-3">
                  <div 
                    style={{ 
                      backgroundColor: 'rgba(40, 40, 40, 0.7)',
                      borderRadius: '10px',
                      padding: '15px',
                      height: '100%'
                    }}
                  >
                    <h1 
                      style={{ 
                        color: '#f8f812',
                        fontSize: '1.5rem',
                        marginBottom: '5px',
                        textTransform: 'capitalize',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {user.role || 'Survivor'}
                    </h1>
                    <p className="text-light m-0">Survivor Role</p>
                  </div>
                </div>
              </div>
              
              {/* Date Joined */}
              <div 
                style={{ 
                  marginTop: '20px',
                  padding: '10px',
                  backgroundColor: 'rgba(61, 154, 64, 0.1)',
                  borderRadius: '5px',
                  border: '1px solid rgba(61, 154, 64, 0.3)'
                }}
              >
                <p className="text-light m-0 text-center">
                  <strong>Joined the Apocalypse:</strong> {formatJoinDate()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;