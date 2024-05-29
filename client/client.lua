-- Client-side Lua script for notifications

-- Function to handle incoming notification data
RegisterNetEvent('arnas-notify:Notify')
AddEventHandler('arnas-notify:Notify', function(data)
    SendNUIMessage({
        action = 'notify',
        title = data.title,
        text = data.description,
        color = data.color or 'white',  -- default color
        icon = data.icon or 'fas fa-info-circle',  -- default icon
        duration = data.duration or 5  -- default duration
    })
end)

-- Function to display notifications using HTML and JS
function SendNotification(title, text, color, icon, duration)
    TriggerEvent('arnas-notify:Notify', {
        title = title,
        description = text,
        color = color,
        icon = icon,
        duration = duration
    })
end

-- Commands for each type of notification
RegisterCommand('notifySuccess', function(source, args)
    SendNotification('Success!', 'Operation completed successfully', 'green', 'fas fa-check-circle', 10)
end, false)

RegisterCommand('notifyInfo', function(source, args)
    SendNotification('Info', 'This is an informational message', 'blue', 'fas fa-info-circle', 8)
end, false)

RegisterCommand('notifyError', function(source, args)
    SendNotification('Error!', 'An error occurred during the operation', 'red', 'fas fa-exclamation-triangle', 10)
end, false)

RegisterCommand('notifySupport', function(source, args)
    SendNotification('Support', 'Need help? Contact support.', 'yellow', 'fas fa-life-ring', 12)
end, false)

RegisterCommand('notifyCustom', function(source, args)
    SendNotification('Custom Notification', 'This notification has a custom icon and color', '#FFA500', 'fas fa-rocket', 8)
end, false)

-- Usage:
-- /notifySuccess
-- /notifyInfo
-- /notifyError
-- /notifySupport
-- /notifyCustom
